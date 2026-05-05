import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blank Space SL",
    short_name: "Blank Space",
    description: "Premier recording studio, rehearsal space, and creative agency in Freetown, Sierra Leone.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#f37335",
    orientation: "portrait-primary",
    categories: ["music", "entertainment", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Reggie's Gallery",
        short_name: "Gallery",
        url: "/events/reggies-jazz-exchange/gallery",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        url: "/contact",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
    screenshots: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  }
}
