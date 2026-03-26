"use client"

import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioWaveformProps {
  src: string
  title: string
}

export function AudioWaveform({ src, title }: AudioWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#9ca3af",
      progressColor: "#0a0a0a",
      cursorColor: "#0a0a0a",
      barWidth: 2,
      barGap: 3,
      barRadius: 3,
      height: 48,
      normalize: true,
      url: src,
    })

    wavesurfer.on("play", () => setIsPlaying(true))
    wavesurfer.on("pause", () => setIsPlaying(false))
    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration())
      setIsReady(true)
    })
    wavesurfer.on("audioprocess", () => setCurrentTime(wavesurfer.getCurrentTime()))
    wavesurfer.on("interaction", () => setCurrentTime(wavesurfer.getCurrentTime()))

    wavesurferRef.current = wavesurfer

    return () => {
      wavesurfer.destroy()
    }
  }, [src])

  const togglePlay = () => {
    if (!isReady) return
    wavesurferRef.current?.playPause()
  }

  const toggleMute = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setMuted(!isMuted)
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-background border border-border p-5 rounded-2xl shadow-sm transition-all hover:shadow-md group">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold tracking-tight pr-4 uppercase text-foreground/80">{title}</h4>
        <div className="text-[10px] font-bold text-muted-foreground tabular-nums bg-muted px-2.5 py-1 rounded-full border border-border/50">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-95 shadow-lg shadow-foreground/10 flex items-center justify-center disabled:opacity-50"
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 fill-current ml-1" />
          )}
        </Button>
        
        <div className="flex-1 min-w-0 h-[48px] flex items-center">
          {!isReady && (
            <div className="w-full h-1 bg-muted animate-pulse rounded-full" />
          )}
          <div ref={containerRef} className={`w-full ${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-500 cursor-pointer`} />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  )
}
