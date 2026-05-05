"use client"

import { useState } from "react"
import { Grid3x3, LayoutGrid, LayoutList, Square } from "lucide-react"
import { GalleryGrid } from "@/components/reggies-gallery-grid"

interface GalleryClientProps {
  images: string[]
}

type LayoutType = "masonry" | "grid" | "list"

export function GalleryClient({ images }: GalleryClientProps) {
  const [enablePagination, setEnablePagination] = useState(true)
  const [layoutType, setLayoutType] = useState<LayoutType>("masonry")

  const layoutOptions = [
    { type: "masonry" as LayoutType, icon: Square, label: "Masonry" },
    { type: "grid" as LayoutType, icon: LayoutGrid, label: "Grid" },
    { type: "list" as LayoutType, icon: LayoutList, label: "List" },
  ]

  return (
    <>
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <p className="text-white/30 text-xs font-mono">{images.length} photos</p>
          
          {/* Layout Options */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
            {layoutOptions.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setLayoutType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  layoutType === type
                    ? "bg-[#f37335] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pagination Toggle */}
        <button
          onClick={() => setEnablePagination(!enablePagination)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            enablePagination
              ? "bg-[#f37335] text-white"
              : "bg-white/10 text-white/60 hover:bg-white/20"
          }`}
        >
          <Grid3x3 className="h-4 w-4" />
          {enablePagination ? "Paginated" : "Show All"}
        </button>
      </div>

      <GalleryGrid images={images} enablePagination={enablePagination} layoutType={layoutType} />
    </>
  )
}
