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

function GalleryImage({
  src,
  index,
  onClick,
  fixedRatio,
}: {
  src: string
  index: number
  onClick: () => void
  fixedRatio?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const aspectRatio = fixedRatio ? 1 : [1, 1.2, 0.8, 1.5, 0.9, 1.1, 1.3, 0.7][index % 8]

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-lg md:rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f37335] w-full"
      style={{ aspectRatio }}
    >
      {!loaded && <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg md:rounded-xl" />}

      <Image
        src={src}
        alt={`Reggie's Jazz Exchange — moment ${index + 1}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />

      <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/50 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-5 w-5 md:h-6 md:w-6 drop-shadow" />
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
  const touchStartX = useRef<number | null>(null)

  const totalPages = Math.ceil(images.length / PAGE_SIZE)
  const displayImages = enablePagination
    ? images.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
    : images

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

  // Keyboard nav
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

  // Close lightbox when page changes
  useEffect(() => { setLightboxIndex(null) }, [page])

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex === null || downloading) return
    setDownloading(true)
    await downloadImage(
      displayImages[lightboxIndex],
      enablePagination ? page * PAGE_SIZE + lightboxIndex : lightboxIndex
    )
    setDownloading(false)
  }

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  const globalIndex = lightboxIndex !== null
    ? (enablePagination ? page * PAGE_SIZE + lightboxIndex : lightboxIndex) + 1
    : 0

  return (
    <>
      {/* Grid */}
      <div ref={gridRef} className="scroll-mt-20">
        {layoutType === "masonry" && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-1 md:gap-1.5">
            {displayImages.map((src, i) => (
              <div key={src} className="break-inside-avoid mb-1 md:mb-1.5">
                <GalleryImage
                  src={src}
                  index={enablePagination ? page * PAGE_SIZE + i : i}
                  onClick={() => open(i)}
                />
              </div>
            ))}
          </div>
        )}

        {layoutType === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-1.5">
            {displayImages.map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                index={enablePagination ? page * PAGE_SIZE + i : i}
                onClick={() => open(i)}
                fixedRatio
              />
            ))}
          </div>
        )}

        {layoutType === "list" && (
          <div className="space-y-2">
            {displayImages.map((src, i) => (
              <div
                key={src}
                className="flex gap-3 md:gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => open(i)}
              >
                <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
                  <Image
                    src={src}
                    alt={`Moment ${enablePagination ? page * PAGE_SIZE + i + 1 : i + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div>
                    <p className="text-[#fdfaf3]/70 text-sm font-medium truncate">
                      Moment {enablePagination ? page * PAGE_SIZE + i + 1 : i + 1}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">Reggie&apos;s Jazz Exchange</p>
                  </div>
                  <span className="text-[#f37335] text-xs font-semibold shrink-0 ml-2">View →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="mt-10 md:mt-12 flex items-center justify-center gap-3">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`transition-all duration-200 rounded-full text-xs font-semibold ${
                  i === page
                    ? "w-8 h-8 bg-[#f37335] text-white"
                    : "w-8 h-8 bg-white/5 hover:bg-white/10 text-white/50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-3 md:px-5 py-3 md:py-4 z-10 shrink-0">
            <span className="text-white/40 text-xs font-mono tracking-widest">
              {globalIndex} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-[#f37335]/80 text-white text-xs font-semibold transition-colors disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{downloading ? "Saving…" : "Download"}</span>
              </button>
              <button
                onClick={close}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center relative px-12 md:px-20 pb-4 min-h-0">
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-1 md:left-4 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <div
              className="relative w-full h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[lightboxIndex]}
                alt={`Reggie's Jazz Exchange — moment ${globalIndex}`}
                fill
                sizes="(max-width: 640px) 100vw, 90vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-1 md:right-4 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Swipe hint on mobile */}
          <p className="text-center text-white/20 text-[10px] pb-4 shrink-0 md:hidden">
            Swipe to navigate
          </p>
        </div>
      )}
    </>
  )
}
