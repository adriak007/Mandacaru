'use client'

export {
  Home as HomeIcon,
  MessageSquare as ChatIcon,
  Check as CheckIcon,
  Mic as MicIcon,
  Droplets as DropIcon,
  Sun as SunIcon,
  Cloud as CloudIcon,
  Leaf as PlantIcon,
  Bell as BellIcon,
  Waves as WaveIcon,
  Sparkles as SparkIcon,
  Settings as SettingsIcon,
  Coins as CoinsIcon,
  Activity as PulseIcon,
  Pause as PauseIcon,
  X as XIcon,
  AudioWaveform as VoiceIcon,
  Eye as EyeIcon,
  Calendar as CalendarIcon,
  ArrowUp as ArrowUpIcon,
  Send as SendIcon,
} from 'lucide-react'

interface IconProps {
  size?: number
  stroke?: string
  strokeWidth?: number
  className?: string
  fill?: string
}

export function CactusIcon({ size = 24, stroke = 'currentColor', strokeWidth = 1.7, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 21h6" />
      <path d="M12 21V8" />
      <rect x="9" y="6" width="6" height="12" rx="3" />
      <path d="M9 12a3 3 0 0 1-3-3V8M15 14a3 3 0 0 0 3-3v-2" />
    </svg>
  )
}

export function GoatIcon({ size = 24, stroke = 'currentColor', strokeWidth = 1.7, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9c0-2 1-3 2.5-3 1 0 1.5.5 2.5 1.5M18 9c0-2-1-3-2.5-3-1 0-1.5.5-2.5 1.5" />
      <path d="M5 10c0 5 3 9 7 9s7-4 7-9c0-1-.5-2-1.5-2h-11C5.5 8 5 9 5 10z" />
      <circle cx="9" cy="13" r="0.5" fill={stroke} />
      <circle cx="15" cy="13" r="0.5" fill={stroke} />
    </svg>
  )
}
