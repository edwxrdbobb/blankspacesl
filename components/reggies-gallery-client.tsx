"use client"

import { useState } from "react"
import { Grid3x3, LayoutGrid, LayoutList, LayoutPanelLeft } from "lucide-react"
import { GalleryGrid } from "@/components/reggies-gallery-grid"

interface GalleryClientProps {
  images: string[]
}

type LayoutType = "masonry" | "grid" | "list"

export function GalleryClient({ images }: GalleryClientProps) {
  const [enablePagination, setEnablePagination] = useState(true)
  const [layoutType, setLayoutType] = useState<LayoutType>("masonry")

  const layoutOptions = [
    { type: "masonry" as LayoutType, icon: LayoutPanelLeft, label: "Masonry" },
    { type: "grid" as LayoutType, icon: LayoutGrid, label: "Grid" },
    { type: "list" as LayoutType, icon: LayoutList, label: "List" },
  ]

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <p className="text-white/30 text-xs font-mono shrink-0">{images.length} photos</p>

          {/* Layout switcher */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
            {layoutOptions.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setLayoutType(type)}
                title={label}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  layoutType === type
                    ? "bg-[#f37335] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pagination toggle */}
        <button
          onClick={() => setEnablePagination(!enablePagination)}
          className={`self-start sm:self-auto flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all ${
            enablePagination
              ? "bg-[#f37335] text-white"
              : "bg-white/10 text-white/60 hover:bg-white/20"
          }`}
        >
          <Grid3x3 className="h-3.5 w-3.5" />
          {enablePagination ? "Paginated" : "Show All"}
        </button>
      </div>

      <GalleryGrid images={images} enablePagination={enablePagination} layoutType={layoutType} />
    </>
  )
}
