import Image from "next/image"

interface ReggiesLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ReggiesLogo({ className = "", size = "md" }: ReggiesLogoProps) {
  const sizes = {
    sm: { width: 200, height: 80 },
    md: { width: 280, height: 112 },
    lg: { width: 360, height: 144 }
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/Reggies.jpeg"
        alt="Reggie's Jazz Exchange"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
        priority
      />
    </div>
  )
}
