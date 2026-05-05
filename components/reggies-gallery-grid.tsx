"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from "lucide-react"

const PAGE_SIZE = 12

interface GalleryGridProps {
  images: string[]
  enablePagination?: boolean
  layoutType?: "masonry" | "grid" | "list"
}

function GalleryImage({ src, index, onClick, fixedRatio }: { src: string; index: number; onClick: () => void; fixedRatio?: boolean }) {
  const [loaded, setLoaded] = useState(false)

  const aspectRatio = fixedRatio ? 1 : [1, 1.2, 0.8, 1.5, 0.9, 1.1, 1.3, 0.7][index % 8]

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f37335] w-full"
      style={{ aspectRatio }}
    >
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

export function GalleryGrid({ images, enablePagination = true, layoutType = "masonry" }: GalleryGridProps) {
  const [page, setPage] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [downloading, setDownloading] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(images.length / PAGE_SIZE)
  const pageImages = enablePagination ? images.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) : images
  const displayImages = enablePagination ? pageImages : images

  const goToPage = (p: number) => {
    setPage(p)
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + displayImages.length) % displayImages.length)
  }, [lightboxIndex, displayImages.length])

  const next = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % displayImages.length)
  }, [lightboxIndex, displayImages.length])

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

  // Close lightbox on page change
  useEffect(() => { setLightboxIndex(null) }, [page])

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex === null || downloading) return
    setDownloading(true)
    await downloadImage(displayImages[lightboxIndex], enablePagination ? page * PAGE_SIZE + lightboxIndex : lightboxIndex)
    setDownloading(false)
  }

  return (
    <>
      {/* Grid */}
      <div ref={gridRef} className="scroll-mt-24">
        {layoutType === "masonry" && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-1.5 md:gap-2 space-y-1.5 md:space-y-2">
            {displayImages.map((src, i) => (
              <div key={src} className="break-inside-avoid mb-1.5 md:mb-2">
                <GalleryImage src={src} index={enablePagination ? page * PAGE_SIZE + i : i} onClick={() => open(i)} />
              </div>
            ))}
          </div>
        )}
        
        {layoutType === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2">
            {displayImages.map((src, i) => (
              <GalleryImage key={src} src={src} index={enablePagination ? page * PAGE_SIZE + i : i} onClick={() => open(i)} fixedRatio />
            ))}
          </div>
        )}

        {layoutType === "list" && (
          <div className="space-y-2">
            {displayImages.map((src, i) => (
              <div key={src} className="flex gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <GalleryImage src={src} index={enablePagination ? page * PAGE_SIZE + i : i} onClick={() => open(i)} fixedRatio />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Reggie's Jazz Exchange — Moment {enablePagination ? page * PAGE_SIZE + i + 1 : i + 1}</p>
                    <p className="text-white/30 text-xs mt-1">Click to view full size</p>
                  </div>
                  <button
                    onClick={() => open(i)}
                    className="text-[#f37335] hover:text-[#f37335]/80 text-sm font-medium"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all duration-200 rounded-full ${
                  i === page
                    ? "w-8 h-8 bg-[#f37335] text-white text-xs font-semibold"
                    : "w-8 h-8 bg-white/5 hover:bg-white/10 text-white/60 text-xs font-medium"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-4 z-10">
            <span className="text-white/40 text-xs font-mono tracking-widest">
              {enablePagination ? page * PAGE_SIZE + lightboxIndex + 1 : lightboxIndex + 1} / {images.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-[#f37335]/80 text-white text-xs font-semibold transition-colors duration-200 disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                {downloading ? "Saving…" : "Download"}
              </button>

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
              src={displayImages[lightboxIndex]}
              alt={`Reggie's Jazz Exchange — moment ${enablePagination ? page * PAGE_SIZE + lightboxIndex + 1 : lightboxIndex + 1}`}
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
