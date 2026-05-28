'use client'

import { useStore } from '@/lib/store'
import AgentMark from '@/components/AgentMark'
import {
  SettingsIcon,
  CoinsIcon,
  PulseIcon,
  PlantIcon,
  SunIcon,
  DropIcon,
  CheckIcon,
  XIcon,
} from '@/components/icons'
import { GoatIcon, CactusIcon } from '@/components/icons'
import { Tab } from '@/components/TabBar'

interface HomeScreenProps {
  onNavigate: (tab: Tab) => void
  onOpenSettings: () => void
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

function DecisionIcon({ iconType }: { iconType: 'coins' | 'pulse' | 'plant' }) {
  if (iconType === 'coins') return <CoinsIcon size={18} stroke="#C16A3F" strokeWidth={1.8} />
  if (iconType === 'pulse') return <PulseIcon size={18} stroke="#3E6B91" strokeWidth={1.8} />
  return <PlantIcon size={18} stroke="#2A4A36" strokeWidth={1.8} />
}

export default function HomeScreen({ onNavigate, onOpenSettings }: HomeScreenProps) {
  const { decisions, approveDecision, rejectDecision, settings, farmConfig } = useStore()
  const pending = decisions.filter(d => d.status === 'pending')
  const pendingCount = pending.length
  const quickCards = pending.slice(0, 2)

  const cisternaConfigurada = farmConfig.cisternaCapacidade > 0
  const cisternaLitros = Math.round(farmConfig.cisternaCapacidade * farmConfig.cisternaAtual / 100)
  const cisternaDias = Math.round(cisternaLitros / 800)
  const cisternaLitrosStr = cisternaLitros.toLocaleString('pt-BR')

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-3">
        <AgentMark size={42} variant="logo" pulse />
        <div className="flex flex-col flex-1">
          <span className="font-mono text-[12px] text-ink-mute tracking-wider uppercase">
            BOA TARDE, {settings.userName.toUpperCase()}
          </span>
          <span className="font-head text-[19px] font-semibold text-ink tracking-tight">
            {settings.farmName}
          </span>
        </div>
        <button
          className="w-[38px] h-[38px] bg-paper rounded-[7px] border border-line flex items-center justify-center flex-shrink-0 cursor-pointer"
          onClick={onOpenSettings}
        >
          <SettingsIcon size={18} stroke="#566054" strokeWidth={1.8} />
        </button>
      </div>

      {/* Hero card */}
      <div className="mx-4 rounded-xl bg-green p-[18px] relative overflow-hidden mb-5">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(#D6A23A 1px, transparent 1.4px)',
            backgroundSize: '14px 14px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] rounded-full px-2 py-[3px] tracking-wide uppercase"
              style={{ backgroundColor: 'rgba(214,162,58,0.15)', color: '#F4E2B0' }}
            >
              • ao vivo
            </span>
            <span className="text-ink-mute text-[11px] font-sans">atualizado há 4 min</span>
          </div>

          <p className="font-head text-[22px] font-medium text-cream leading-[1.25] tracking-tight mt-3 mb-4">
            O Mandacaru tá{' '}
            <span className="text-gold">cuidando da {settings.farmName || 'fazenda'}.</span>{' '}
            {cisternaConfigurada
              ? `Cisterna em ${farmConfig.cisternaAtual}%, ${farmConfig.rebanhoTotal} animais no rebanho.`
              : 'Configure os dados da sua fazenda na aba Fazenda para monitoramento completo.'}
          </p>

          <div className="flex gap-2">
            <button
              className="flex-1 h-11 bg-gold text-green font-head text-[15px] font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => onNavigate('chat')}
            >
              Falar com ele
            </button>
          </div>
        </div>
      </div>

      {/* "Precisa de você" section */}
      <div className="px-5 pt-1 pb-3 flex items-baseline justify-between">
        <span className="font-head text-[16px] font-semibold text-ink">Precisa de você</span>
        {pendingCount > 0 ? (
          <button
            className="text-[13px] font-sans font-medium text-terra cursor-pointer"
            onClick={() => onNavigate('approve')}
          >
            {pendingCount} {pendingCount === 1 ? 'decisão' : 'decisões'} →
          </button>
        ) : (
          <span className="text-[13px] font-sans text-ink-mute">Tudo aprovado ✓</span>
        )}
      </div>

      {/* Approval quick cards */}
      <div className="px-4 flex flex-col gap-2.5">
        {quickCards.length === 0 && (
          <div className="bg-paper card-shadow rounded-xl p-3.5 text-center text-[13.5px] font-sans text-ink-mute">
            Nenhuma decisão pendente
          </div>
        )}
        {quickCards.map(decision => (
          <div key={decision.id} className="bg-paper card-shadow rounded-xl p-3.5 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: decision.iconBg }}
            >
              <DecisionIcon iconType={decision.iconType} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-head text-[14.5px] font-semibold text-ink">{decision.title}</div>
              <div className="text-[12.5px] text-ink-soft font-sans mt-0.5">
                {decision.cost !== '—' ? `${decision.cost} · ` : ''}{decision.when}
              </div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                className="w-9 h-9 bg-green rounded-[6px] flex items-center justify-center cursor-pointer"
                onClick={() => approveDecision(decision.id)}
              >
                <CheckIcon size={16} stroke="#FAF6EC" strokeWidth={2.5} />
              </button>
              <button
                className="w-9 h-9 bg-paper rounded-[6px] border border-line-strong flex items-center justify-center cursor-pointer"
                onClick={() => rejectDecision(decision.id)}
              >
                <XIcon size={16} stroke="#566054" strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
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
          value={cisternaConfigurada ? `${farmConfig.cisternaAtual}%` : '—'}
          progress={cisternaConfigurada ? farmConfig.cisternaAtual : undefined}
          progressColor="#3E6B91"
          sub={cisternaConfigurada ? `≈ ${cisternaLitrosStr} L · ${cisternaDias} dias` : 'Não configurado'}
        />
        <StatusTile
          icon={<GoatIcon size={18} stroke="#2A4A36" strokeWidth={1.8} />}
          iconBg="#E9EFDF"
          label="REBANHO"
          value={farmConfig.rebanhoTotal > 0 ? String(farmConfig.rebanhoTotal) : '—'}
          sub={farmConfig.rebanhoTotal > 0 ? `${farmConfig.rebanhoSaudaveis} saudáveis · ${farmConfig.rebanhoAtencao} atenção` : 'Não configurado'}
        />
        <StatusTile
          icon={<CactusIcon size={18} stroke="#C16A3F" strokeWidth={1.8} />}
          iconBg="#F2DCCB"
          label="PALMA"
          value={farmConfig.palmaArea > 0 ? farmConfig.palmaStatus : '—'}
          sub={farmConfig.palmaArea > 0 ? `${farmConfig.palmaArea} ha · colheita em ${farmConfig.palmaDiasColheita}d` : 'Não configurado'}
        />
      </div>
    </div>
  )
}
