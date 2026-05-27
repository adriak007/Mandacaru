'use client'

import { useState } from 'react'
import { useStore, Decision } from '@/lib/store'
import { CoinsIcon, PulseIcon, PlantIcon, SparkIcon, ChatIcon } from '@/components/icons'
import { Tab } from '@/components/TabBar'

interface ApproveScreenProps {
  onNavigate: (tab: Tab) => void
}

type FilterId = 'all' | 'compras' | 'saude' | 'plantio'

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'compras', label: 'Compras' },
  { id: 'saude', label: 'Saúde' },
  { id: 'plantio', label: 'Plantio' },
]

function DecisionIcon({ iconType }: { iconType: Decision['iconType'] }) {
  if (iconType === 'coins') return <CoinsIcon size={22} stroke="#C16A3F" strokeWidth={1.8} />
  if (iconType === 'pulse') return <PulseIcon size={22} stroke="#3E6B91" strokeWidth={1.8} />
  return <PlantIcon size={22} stroke="#2A4A36" strokeWidth={1.8} />
}

interface DecisionCardProps {
  decision: Decision
  onApprove: () => void
  onReject: () => void
  onChat: () => void
}

function DecisionCard({ decision, onApprove, onChat }: DecisionCardProps) {
  const [approved, setApproved] = useState(false)

  function handleApprove() {
    setApproved(true)
    setTimeout(onApprove, 300)
  }

  return (
    <div
      className={`bg-paper card-shadow rounded-xl overflow-hidden transition-opacity duration-300 ${approved ? 'opacity-40' : 'opacity-100'}`}
    >
      {/* Card header */}
      <div className="p-3.5 flex gap-3 items-start">
        <div
          className="w-11 h-11 rounded-[7px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: decision.iconBg }}
        >
          <DecisionIcon iconType={decision.iconType} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="font-mono text-[9.5px] font-semibold tracking-wider mb-1 uppercase"
            style={{ color: decision.tagColor }}
          >
            {decision.tagText}
          </div>
          <div className="font-head text-[16px] font-semibold text-ink tracking-tight leading-snug">
            {decision.title}
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="px-3.5 pb-3">
        <div className="bg-cream rounded-[7px] p-2.5 flex gap-2">
          <div className="w-[18px] h-[18px] rounded-[4px] bg-green flex items-center justify-center flex-shrink-0 mt-px">
            <SparkIcon size={11} stroke="#D6A23A" fill="#D6A23A" strokeWidth={1.5} />
          </div>
          <span className="text-[12.5px] font-sans text-ink-soft leading-[1.4]">{decision.reason}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3.5 pb-3.5 flex items-center justify-between">
        <div>
          <div className="font-head text-[18px] font-semibold text-ink tracking-tight">{decision.cost}</div>
          <div className="text-[11.5px] font-sans text-ink-mute mt-[-2px]">{decision.when}</div>
        </div>
        <div className="flex gap-2">
          <button
            className="h-[38px] px-3.5 rounded-[7px] border border-line-strong text-ink-soft font-head text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer active:bg-sand"
            onClick={onChat}
          >
            <ChatIcon size={14} stroke="#566054" strokeWidth={2} />
            Conversar
          </button>
          <button
            className="h-[38px] px-4 rounded-[7px] bg-green text-cream font-head text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer active:bg-green-mid"
            onClick={handleApprove}
            disabled={approved}
          >
            {approved ? '✓ Aprovado' : 'Aprovar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ApproveScreen({ onNavigate }: ApproveScreenProps) {
  const { decisions, approveDecision, rejectDecision } = useStore()
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')

  const pending = decisions.filter(d => d.status === 'pending')

  const counts: Record<FilterId, number> = {
    all: pending.length,
    compras: pending.filter(d => d.category === 'compras').length,
    saude: pending.filter(d => d.category === 'saude').length,
    plantio: pending.filter(d => d.category === 'plantio').length,
  }

  const visible = activeFilter === 'all'
    ? pending
    : pending.filter(d => d.category === activeFilter)

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="font-head text-[32px] font-semibold text-ink tracking-tight">Aprovar</h1>
        <p className="text-[13.5px] font-sans text-ink-soft mt-0.5">
          {pending.length === 0
            ? 'Todas as decisões foram resolvidas'
            : `${pending.length} ${pending.length === 1 ? 'decisão esperando' : 'decisões esperando'} você`}
        </p>
      </div>

      {/* Filter pills */}
      <div className="px-5 pt-3 pb-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {filters.map((f) => {
          const isActive = f.id === activeFilter
          return (
            <button
              key={f.id}
              className={`shrink-0 rounded-full px-3 py-1.5 font-head text-[12.5px] font-semibold flex items-center gap-1 cursor-pointer ${
                isActive ? 'bg-green text-cream' : 'border border-line-strong text-ink-soft'
              }`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
              <span className={`font-mono text-[10.5px] ${isActive ? 'text-gold-tint' : 'text-ink-mute'}`}>
                {counts[f.id]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Decision cards */}
      <div className="px-4 flex flex-col gap-3">
        {visible.length === 0 && (
          <div className="bg-paper card-shadow rounded-xl p-5 text-center text-[13.5px] font-sans text-ink-mute">
            {activeFilter === 'all'
              ? 'Nenhuma decisão pendente'
              : `Nenhuma decisão pendente em ${filters.find(f => f.id === activeFilter)?.label}`}
          </div>
        )}
        {visible.map(decision => (
          <DecisionCard
            key={decision.id}
            decision={decision}
            onApprove={() => approveDecision(decision.id)}
            onReject={() => rejectDecision(decision.id)}
            onChat={() => onNavigate('chat')}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-5 text-center">
        <span className="text-[12.5px] font-sans text-ink-mute">
          Ver histórico de decisões —{' '}
          <button
            className="text-terra font-semibold cursor-pointer"
            onClick={() => onNavigate('log')}
          >
            Ver diário →
          </button>
        </span>
      </div>
    </div>
  )
}
