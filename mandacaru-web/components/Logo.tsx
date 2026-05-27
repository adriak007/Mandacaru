import Image from 'next/image'
import logoSrc from './Mandacaru.png'

interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <Image
      src={logoSrc}
      alt="Mandacaru"
      width={size}
      height={size}
      className={className}
      priority
    />
  )
}
