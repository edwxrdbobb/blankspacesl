/* eslint-disable no-console */
const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local")
  if (!fs.existsSync(envPath)) return

  const content = fs.readFileSync(envPath, "utf8")
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const idx = trimmed.indexOf("=")
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

function sha1(input) {
  return crypto.createHash("sha1").update(input).digest("hex")
}

function slugifySegment(segment) {
  return segment
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
}

function encodePublicPath(relPathFromPublic) {
  const parts = relPathFromPublic.split(path.sep).map((part) => encodeURIComponent(part))
  return `/${parts.join("/")}`
}

async function uploadFile({ filePath, relFromPublic, cloudName, apiKey, apiSecret }) {
  const publicPath = encodePublicPath(relFromPublic)
  const fileBuffer = fs.readFileSync(filePath)
  const fileHash = sha1(fileBuffer)
  const timestamp = Math.floor(Date.now() / 1000)

  const slugifiedName = slugifySegment(path.basename(relFromPublic, path.extname(relFromPublic)))
  const folder = "blankspace/reggie-events-images"
  const publicId = `${folder}/${slugifiedName}`

  const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  const signature = sha1(signaturePayload)

  const formData = new FormData()
  formData.append("file", new Blob([fileBuffer]), path.basename(relFromPublic))
  formData.append("public_id", publicId)
  formData.append("timestamp", timestamp.toString())
  formData.append("api_key", apiKey)
  formData.append("signature", signature)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Cloudinary upload failed: ${response.status} ${errorText}`)
  }

  const result = await response.json()
  return result.secure_url
}

async function main() {
  loadDotEnvLocal()

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Missing Cloudinary credentials in .env.local")
    process.exit(1)
  }

  const imagesDir = path.join(process.cwd(), "public", "reggie-events-images")
  if (!fs.existsSync(imagesDir)) {
    console.error("Images directory not found:", imagesDir)
    process.exit(1)
  }

  const files = fs.readdirSync(imagesDir).filter((file) => 
    file.toLowerCase().endsWith(".jpeg") || file.toLowerCase().endsWith(".jpg")
  )

  console.log(`Found ${files.length} images to upload`)

  const manifest = {}
  let uploaded = 0

  for (const file of files) {
    const filePath = path.join(imagesDir, file)
    const relFromPublic = path.join("reggie-events-images", file)

    console.log(`Uploading ${file}...`)

    try {
      const url = await uploadFile({
        filePath,
        relFromPublic,
        cloudName,
        apiKey,
        apiSecret,
      })

      manifest[file] = url
      uploaded++
      console.log(`✅ ${file} -> ${url}`)
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message)
    }
  }

  // Save manifest
  const manifestPath = path.join(process.cwd(), "lib", "cloudinary-manifest.json")
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

  console.log(`\n✅ Successfully uploaded ${uploaded}/${files.length} images`)
  console.log(`Manifest saved to: ${manifestPath}`)
}

main().catch((error) => {
  console.error("Upload failed:", error)
  process.exit(1)
})
