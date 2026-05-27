'use client'

import { CoinsIcon, PulseIcon, PlantIcon, SparkIcon, ChatIcon } from '@/components/icons'
import { Tab } from '@/components/TabBar'

interface ApproveScreenProps {
  onNavigate: (tab: Tab) => void
}

interface DecisionCardProps {
  icon: React.ReactNode
  iconBg: string
  tagText: string
  tagColor: string
  title: string
  reason: string
  cost: string
  when: string
}

function DecisionCard({ icon, iconBg, tagText, tagColor, title, reason, cost, when }: DecisionCardProps) {
  return (
    <div className="bg-paper card-shadow rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="p-3.5 flex gap-3 items-start">
        <div
          className="w-11 h-11 rounded-[7px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="font-mono text-[9.5px] font-semibold tracking-wider mb-1 uppercase"
            style={{ color: tagColor }}
          >
            {tagText}
          </div>
          <div className="font-head text-[16px] font-semibold text-ink tracking-tight leading-snug">
            {title}
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="px-3.5 pb-3">
        <div className="bg-cream rounded-[7px] p-2.5 flex gap-2">
          <div className="w-[18px] h-[18px] rounded-[4px] bg-green flex items-center justify-center flex-shrink-0 mt-px">
            <SparkIcon size={11} stroke="#D6A23A" fill="#D6A23A" strokeWidth={1.5} />
          </div>
          <span className="text-[12.5px] font-sans text-ink-soft leading-[1.4]">{reason}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3.5 pb-3.5 flex items-center justify-between">
        <div>
          <div className="font-head text-[18px] font-semibold text-ink tracking-tight">{cost}</div>
          <div className="text-[11.5px] font-sans text-ink-mute mt-[-2px]">{when}</div>
        </div>
        <div className="flex gap-2">
          <button className="h-[38px] px-3.5 rounded-[7px] border border-line-strong text-ink-soft font-head text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer">
            <ChatIcon size={14} stroke="#566054" strokeWidth={2} />
            Conversar
          </button>
          <button className="h-[38px] px-4 rounded-[7px] bg-green text-cream font-head text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer">
            Aprovar
          </button>
        </div>
      </div>
    </div>
  )
}

type FilterId = 'all' | 'compras' | 'saude' | 'plantio'

const filters: { id: FilterId; label: string; count: number }[] = [
  { id: 'all', label: 'Tudo', count: 3 },
  { id: 'compras', label: 'Compras', count: 1 },
  { id: 'saude', label: 'Saúde', count: 1 },
  { id: 'plantio', label: 'Plantio', count: 1 },
]

export default function ApproveScreen({ onNavigate }: ApproveScreenProps) {
  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="font-head text-[32px] font-semibold text-ink tracking-tight">Aprovar</h1>
        <p className="text-[13.5px] font-sans text-ink-soft mt-0.5">3 decisões esperando você</p>
      </div>

      {/* Filter pills */}
      <div className="px-5 pt-3 pb-4 flex gap-1.5">
        {filters.map((f) => {
          const isActive = f.id === 'all'
          return (
            <button
              key={f.id}
              className={`rounded-full px-3 py-1.5 font-head text-[12.5px] font-semibold flex items-center gap-1 cursor-pointer ${
                isActive
                  ? 'bg-green text-cream'
                  : 'border border-line-strong text-ink-soft'
              }`}
            >
              {f.label}
              <span className={`font-mono text-[10.5px] ${isActive ? 'text-gold-tint' : 'text-ink-mute'}`}>
                {f.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Decision cards */}
      <div className="px-4 flex flex-col gap-3">
        <DecisionCard
          icon={<CoinsIcon size={22} stroke="#C16A3F" strokeWidth={1.8} />}
          iconBg="#F2DCCB"
          tagText="COMPRA · URGENTE"
          tagColor="#C16A3F"
          title="Comprar 80 kg de palma forrageira"
          reason="A palma da fazenda chega no fim em 12 dias. Sr. Damião tem estoque por R$ 1,20/kg — preço normal."
          cost="R$ 96,00"
          when="entrega quinta · 26/05"
        />
        <DecisionCard
          icon={<PulseIcon size={22} stroke="#3E6B91" strokeWidth={1.8} />}
          iconBg="#D9E4EE"
          tagText="SAÚDE DO REBANHO"
          tagColor="#3E6B91"
          title="Vacinar 12 cabras contra raiva"
          reason="Reforço anual vence em 6 dias. Veterinária Dra. Cida tem agenda livre sábado."
          cost="R$ 144,00"
          when="sábado · 31/05 · 08:00"
        />
        <DecisionCard
          icon={<PlantIcon size={22} stroke="#2A4A36" strokeWidth={1.8} />}
          iconBg="#E9EFDF"
          tagText="PLANTIO"
          tagColor="#2A4A36"
          title="Adiar plantio de feijão de corda"
          reason="Previsão de chuva pra próxima quinzena tá baixa (8mm acumulado). Plantar agora arrisca a germinação."
          cost="—"
          when="reavaliar em 7 dias"
        />
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
