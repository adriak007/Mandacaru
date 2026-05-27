'use client'

import Image from 'next/image'
import logoSrc from './Mandacaru.png'

interface AgentMarkProps {
  size?: number
  tone?: 'green' | 'cream'
  pulse?: boolean
  variant?: 'glyph' | 'logo'
}

export default function AgentMark({
  size = 40,
  tone = 'green',
  pulse = false,
  variant = 'glyph',
}: AgentMarkProps) {
  const radius = Math.round(size * 0.28)
  const bgColor = tone === 'green' ? '#2A4A36' : '#FAF6EC'
  const dotSize = Math.round(size * 0.28)

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {variant === 'logo' ? (
        <div
          className="overflow-hidden"
          style={{ width: size, height: size, borderRadius: radius }}
        >
          <Image
            src={logoSrc}
            alt="Mandacaru"
            width={size}
            height={size}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ width: size, height: size, backgroundColor: bgColor, borderRadius: radius }}
        >
          <svg width={size * 0.58} height={size * 0.68} viewBox="0 0 22 26" fill="none">
            <path d="M11 4v18" stroke="#F4E2B0" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M11 4c0-2 1.4-3 3-3s3 1 3 3v6c0 1.4-1.4 2-3 2"
              stroke="#F4E2B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              d="M11 9c0-2-1.4-3-3-3s-3 1-3 3v4c0 1.4 1.4 2 3 2"
              stroke="#F4E2B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M7 22h8" stroke="#F4E2B0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {pulse && (
        <span
          className="absolute bg-gold rounded-full ring-2 ring-white"
          style={{
            width: dotSize,
            height: dotSize,
            bottom: -Math.round(dotSize * 0.15),
            right: -Math.round(dotSize * 0.15),
          }}
        />
      )}
    </div>
  )
}
