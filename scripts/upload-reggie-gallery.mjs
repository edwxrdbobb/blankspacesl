import { createHash } from "crypto"
import { readFileSync, readdirSync, writeFileSync } from "fs"
import { join, basename } from "path"

const CLOUD_NAME = "dhixhto9s"
const API_KEY = "387133468265213"
const API_SECRET = "qAMR3zXmJ69dhkz_d6V0TQ9H-oM"
const FOLDER = "blankspace/reggies-gallery"
const IMAGES_DIR = join(process.cwd(), "Reggie_s Jazz Exchange Event Pictures")

function makeSignature(params) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&")
  return createHash("sha1")
    .update(sorted + API_SECRET)
    .digest("hex")
}

async function uploadImage(filePath, publicId) {
  const timestamp = Math.floor(Date.now() / 1000)
  const params = { folder: FOLDER, public_id: publicId, timestamp }
  const signature = makeSignature(params)

  const form = new FormData()
  const fileBytes = readFileSync(filePath)
  form.append("file", new Blob([fileBytes], { type: "image/jpeg" }), basename(filePath))
  form.append("api_key", API_KEY)
  form.append("timestamp", String(timestamp))
  form.append("signature", signature)
  form.append("folder", FOLDER)
  form.append("public_id", publicId)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Upload failed for ${basename(filePath)}: ${err}`)
  }

  const data = await res.json()
  return data.secure_url
}

function slugify(name) {
  return name
    .replace(/\.jpeg$/i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}

async function main() {
  const files = readdirSync(IMAGES_DIR)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()

  console.log(`Found ${files.length} images to upload`)

  const results = {}
  let done = 0

  for (const file of files) {
    const filePath = join(IMAGES_DIR, file)
    const publicId = `reggies-gallery-${slugify(file)}`
    try {
      const url = await uploadImage(filePath, publicId)
      results[file] = url
      done++
      process.stdout.write(`\r[${done}/${files.length}] ${file.slice(0, 50)}`)
    } catch (err) {
      console.error(`\nFailed: ${file} — ${err.message}`)
    }
  }

  console.log(`\nDone. Uploaded ${done}/${files.length}`)
  writeFileSync("scripts/reggie-gallery-urls.json", JSON.stringify(results, null, 2))
  console.log("URLs saved to scripts/reggie-gallery-urls.json")
}

main()
