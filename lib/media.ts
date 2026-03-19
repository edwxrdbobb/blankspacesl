import cloudinaryManifest from "@/lib/cloudinary-manifest.json"

type Manifest = Record<string, string>

export function mediaUrl(publicPath: string): string {
  const manifest = cloudinaryManifest as Manifest
  return manifest[publicPath] ?? publicPath
}

function isCloudinaryVideoUrl(url: string): boolean {
  return url.startsWith("https://res.cloudinary.com/") && url.includes("/video/upload/")
}

export function cloudinaryVideoPosterUrl(videoUrl: string, seconds = 1, format: "jpg" | "png" = "jpg"): string | null {
  if (!isCloudinaryVideoUrl(videoUrl)) return null

  const uploadMarker = "/video/upload/"
  const idx = videoUrl.indexOf(uploadMarker)
  if (idx === -1) return null

  const prefix = videoUrl.slice(0, idx + uploadMarker.length)
  const rest = videoUrl.slice(idx + uploadMarker.length)

  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 1
  const transform = `so_${safeSeconds},f_${format}`

  const base = `${prefix}${transform}/${rest}`
  return base.replace(/\.[a-z0-9]+(\?.*)?$/i, `.${format}$1`)
}
