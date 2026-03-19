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

function walkFiles(dir) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkFiles(full))
    else out.push(full)
  }
  return out
}

function getResourceType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const videoLike = new Set([
    ".mp4",
    ".mov",
    ".m4v",
    ".webm",
    ".mp3",
    ".wav",
    ".aac",
    ".m4a",
    ".ogg",
  ])
  return videoLike.has(ext) ? "video" : "image"
}

function buildPublicId(relFromPublic) {
  const noExt = relFromPublic.replace(new RegExp(`${path.extname(relFromPublic)}$`), "")
  const parts = noExt.split(path.sep).map(slugifySegment)
  return ["blankspace", ...parts].join("/")
}

async function uploadFile({ filePath, relFromPublic, cloudName, apiKey, apiSecret }) {
  const resourceType = getResourceType(filePath)
  const publicId = buildPublicId(relFromPublic)
  const timestamp = Math.floor(Date.now() / 1000)

  const paramsToSign = {
    overwrite: "true",
    public_id: publicId,
    timestamp: String(timestamp),
  }

  const signatureBase =
    Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join("&") + apiSecret

  const signature = sha1(signatureBase)

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

  const buffer = fs.readFileSync(filePath)
  const form = new FormData()
  form.append("file", new Blob([buffer]), path.basename(filePath))
  form.append("api_key", apiKey)
  form.append("timestamp", String(timestamp))
  form.append("public_id", publicId)
  form.append("overwrite", "true")
  form.append("signature", signature)

  const res = await fetch(url, { method: "POST", body: form })
  const json = await res.json().catch(() => null)

  if (!res.ok) {
    const message = json?.error?.message || res.statusText || "Upload failed"
    throw new Error(`${message} (${resourceType} ${relFromPublic})`)
  }

  return {
    publicId,
    secureUrl: json.secure_url,
    resourceType,
  }
}

async function main() {
  loadDotEnvLocal()

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in environment.")
  }

  const manifestPath = path.join(process.cwd(), "lib", "cloudinary-manifest.json")
  const existing = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8") || "{}")
    : {}

  const MEDIA_EXTENSIONS = new Set([
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif",
    ".mp4", ".mov", ".m4v", ".webm", ".mp3", ".wav", ".aac", ".m4a", ".ogg",
  ])

  const targets = [
    path.join(process.cwd(), "public", "events"),
    path.join(process.cwd(), "public", "our-work"),
    path.join(process.cwd(), "public", "Partners"),
  ]

  const files = []

  // Scan public root (non-recursive) for media files
  const publicDir2 = path.join(process.cwd(), "public")
  const SKIP_FILES = new Set([
    "favicon.ico", "apple-icon.png", "icon.png", "icon.svg",
    "icon-dark-32x32.png", "icon-light-32x32.png",
    "logo.png", "navbar-logo.png", "navbar-logo-light.png",
    "placeholder.jpg", "placeholder.svg", "placeholder-logo.png", "placeholder-logo.svg",
    "placeholder-user.jpg",
  ])
  for (const entry of fs.readdirSync(publicDir2, { withFileTypes: true })) {
    if (entry.isDirectory()) continue
    if (entry.name === ".DS_Store") continue
    if (SKIP_FILES.has(entry.name)) continue
    const ext = path.extname(entry.name).toLowerCase()
    if (MEDIA_EXTENSIONS.has(ext)) {
      files.push(path.join(publicDir2, entry.name))
    }
  }

  for (const t of targets) {
    if (!fs.existsSync(t)) continue
    const stat = fs.statSync(t)
    if (stat.isDirectory()) files.push(...walkFiles(t))
    else files.push(t)
  }

  const publicDir = path.join(process.cwd(), "public")

  let uploaded = 0
  for (const filePath of files) {
    const relFromPublic = path.relative(publicDir, filePath)
    const publicPath = encodePublicPath(relFromPublic)

    if (existing[publicPath]) {
      console.log(`skip ${publicPath}`)
      continue
    }

    console.log(`upload ${publicPath}`)
    const result = await uploadFile({ filePath, relFromPublic, cloudName, apiKey, apiSecret })
    existing[publicPath] = result.secureUrl
    uploaded += 1
  }

  fs.writeFileSync(manifestPath, JSON.stringify(existing, null, 2) + "\n", "utf8")
  console.log(`done (${uploaded} uploaded) -> lib/cloudinary-manifest.json`)
}

main().catch((err) => {
  console.error(err?.stack || String(err))
  process.exit(1)
})

