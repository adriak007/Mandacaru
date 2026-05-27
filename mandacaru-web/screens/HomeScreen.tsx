'use client'

import AgentMark from '@/components/AgentMark'
import {
  SettingsIcon,
  CoinsIcon,
  PulseIcon,
  SunIcon,
  DropIcon,
  CheckIcon,
  XIcon,
  PauseIcon,
} from '@/components/icons'
import { GoatIcon, CactusIcon } from '@/components/icons'
import { Tab } from '@/components/TabBar'

interface HomeScreenProps {
  onNavigate: (tab: Tab) => void
}

interface StatusTileProps {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  sub: string
  progress?: number
  progressColor?: string
}

function StatusTile({ icon, iconBg, label, value, sub, progress, progressColor }: StatusTileProps) {
  return (
    <div className="bg-paper card-shadow rounded-xl p-3.5">
      <div
        className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div className="font-mono text-[11px] text-ink-mute uppercase tracking-wider mt-2">{label}</div>
      <div className="font-head text-[26px] font-semibold text-ink tracking-tighter leading-none mt-1">
        {value}
      </div>
      {progress !== undefined && progressColor && (
        <div className="h-1 bg-sand rounded-full mt-2">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: progressColor }}
          />
        </div>
      )}
      <div className="text-[11.5px] font-sans text-ink-soft leading-snug mt-1.5">{sub}</div>
    </div>
  )
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-3">
        <AgentMark size={42} variant="logo" pulse />
        <div className="flex flex-col flex-1">
          <span className="font-mono text-[12px] text-ink-mute tracking-wider uppercase">
            BOA TARDE, SEU JOAQUIM
          </span>
          <span className="font-head text-[19px] font-semibold text-ink tracking-tight">
            Sítio Olho d&apos;Água
          </span>
        </div>
        <button className="w-[38px] h-[38px] bg-paper rounded-[7px] border border-line flex items-center justify-center flex-shrink-0">
          <SettingsIcon size={18} stroke="#566054" strokeWidth={1.8} />
        </button>
      </div>

      {/* Hero card */}
      <div className="mx-4 rounded-xl bg-green p-[18px] relative overflow-hidden mb-5">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(#D6A23A 1px, transparent 1.4px)',
            backgroundSize: '14px 14px',
          }}
        />
        <div className="relative z-10">
          {/* Status row */}
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] rounded-full px-2 py-[3px] tracking-wide uppercase"
              style={{
                backgroundColor: 'rgba(214,162,58,0.15)',
                color: '#F4E2B0',
              }}
            >
              • ao vivo
            </span>
            <span className="text-ink-mute text-[11px] font-sans">atualizado há 4 min</span>
          </div>

          {/* Message */}
          <p className="font-head text-[22px] font-medium text-cream leading-[1.25] tracking-tight mt-3 mb-4">
            O Mandacaru tá{' '}
            <span className="text-gold">cuidando da fazenda.</span>{' '}
            Hoje conferi a cisterna, agendei a vacina das cabras e pedi 80 kg de palma.
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              className="flex-1 h-11 bg-gold text-green font-head text-[15px] font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => onNavigate('chat')}
            >
              Falar com ele
            </button>
            <button className="w-11 h-11 rounded-lg flex items-center justify-center cursor-pointer" style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}>
              <PauseIcon size={20} stroke="#F4E2B0" fill="#F4E2B0" />
            </button>
          </div>
        </div>
      </div>

      {/* "Precisa de você" section */}
      <div className="px-5 pt-1 pb-3 flex items-baseline justify-between">
        <span className="font-head text-[16px] font-semibold text-ink">Precisa de você</span>
        <button
          className="text-[13px] font-sans font-medium text-terra cursor-pointer"
          onClick={() => onNavigate('approve')}
        >
          3 decisões →
        </button>
      </div>

      {/* Approval cards */}
      <div className="px-4 flex flex-col gap-2.5">
        {/* Card 1: Palma */}
        <div className="bg-paper card-shadow rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F2DCCB' }}>
            <CoinsIcon size={18} stroke="#C16A3F" strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-head text-[14.5px] font-semibold text-ink">Comprar 80 kg de palma forrageira</div>
            <div className="text-[12.5px] text-ink-soft font-sans mt-0.5">R$ 96,00 · quinta · 26/05</div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button className="w-9 h-9 bg-green rounded-[6px] flex items-center justify-center">
              <CheckIcon size={16} stroke="#FAF6EC" strokeWidth={2.5} />
            </button>
            <button className="w-9 h-9 bg-paper rounded-[6px] border border-line-strong flex items-center justify-center">
              <XIcon size={16} stroke="#566054" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Card 2: Vacina */}
        <div className="bg-paper card-shadow rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D9E4EE' }}>
            <PulseIcon size={18} stroke="#3E6B91" strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-head text-[14.5px] font-semibold text-ink">Vacinar 12 cabras contra raiva</div>
            <div className="text-[12.5px] text-ink-soft font-sans mt-0.5">R$ 144,00 · sábado · 31/05</div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button className="w-9 h-9 bg-green rounded-[6px] flex items-center justify-center">
              <CheckIcon size={16} stroke="#FAF6EC" strokeWidth={2.5} />
            </button>
            <button className="w-9 h-9 bg-paper rounded-[6px] border border-line-strong flex items-center justify-center">
              <XIcon size={16} stroke="#566054" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* "A fazenda agora" section */}
      <div className="px-5 pt-5 pb-3">
        <span className="font-head text-[16px] font-semibold text-ink">A fazenda agora</span>
      </div>

      {/* Status grid */}
      <div className="px-4 grid grid-cols-2 gap-2.5">
        <StatusTile
          icon={<SunIcon size={18} stroke="#D6A23A" strokeWidth={1.8} />}
          iconBg="#F4E2B0"
          label="CLIMA"
          value="32°"
          sub="Sol firme · 0 mm previsto"
        />
        <StatusTile
          icon={<DropIcon size={18} stroke="#3E6B91" strokeWidth={1.8} />}
          iconBg="#D9E4EE"
          label="CISTERNA"
          value="68%"
          progress={68}
          progressColor="#3E6B91"
          sub="≈ 11 200 L · 14 dias"
        />
        <StatusTile
          icon={<GoatIcon size={18} stroke="#2A4A36" strokeWidth={1.8} />}
          iconBg="#E9EFDF"
          label="REBANHO"
          value="47"
          sub="43 saudáveis · 3 atenção"
        />
        <StatusTile
          icon={<CactusIcon size={18} stroke="#C16A3F" strokeWidth={1.8} />}
          iconBg="#F2DCCB"
          label="PALMA"
          value="Boa"
          sub="2,1 ha · colheita em 18d"
        />
      </div>
    </div>
  )
}
