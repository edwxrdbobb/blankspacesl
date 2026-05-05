"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from "lucide-react"

interface GalleryGridProps {
  images: string[]
}

function GalleryImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)

  const colSpan = (i: number) => {
    const pattern = [1, 1, 2, 1, 2, 1, 1, 1, 2, 1]
    return pattern[i % pattern.length]
  }

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl group aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f37335] ${
        colSpan(index) === 2 ? "col-span-2" : "col-span-1"
      }`}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-xl" />
      )}

      <Image
        src={src}
        alt={`Reggie's Jazz Exchange — moment ${index + 1}`}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/50 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 w-6 drop-shadow" />
      </div>
    </button>
  )
}

async function downloadImage(url: string, index: number) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `reggies-jazz-exchange-${index + 1}.jpg`
    a.click()
    URL.revokeObjectURL(a.href)
  } catch {
    window.open(url, "_blank")
  }
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [downloading, setDownloading] = useState(false)

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
  }, [lightboxIndex, images.length])

  const next = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % images.length)
  }, [lightboxIndex, images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, prev, next])

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex === null || downloading) return
    setDownloading(true)
    await downloadImage(images[lightboxIndex], lightboxIndex)
    setDownloading(false)
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2">
        {images.map((src, i) => (
          <GalleryImage key={src} src={src} index={i} onClick={() => open(i)} />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-4 z-10">
            {/* Counter */}
            <span className="text-white/40 text-xs font-mono tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </span>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Download */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-[#f37335]/80 text-white text-xs font-semibold transition-colors duration-200 disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                {downloading ? "Saving…" : "Download"}
              </button>

              {/* Close */}
              <button
                onClick={close}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 md:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-14 md:mx-20 aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Reggie's Jazz Exchange — moment ${lightboxIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-3 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  )
}
