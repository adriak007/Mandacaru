'use client'

import { SparkIcon, EyeIcon, BellIcon } from '@/components/icons'

type EntryKind = 'agent' | 'sense' | 'wait' | 'div'

interface TimelineEntry {
  t: string
  tag?: string
  kind: EntryKind
  text?: string
  meta?: string
}

const entries: TimelineEntry[] = [
  { t: '14:31', tag: 'AGORA', kind: 'agent', text: 'Você pediu reboque de água. Reservei com Sr. Zé pra sábado 07:00.', meta: '2 000 L · R$ 40' },
  { t: '13:48', kind: 'sense', text: 'Conferi previsão do INMET. 8 mm acumulado em 7 dias. Abaixei a meta de rega da palma.' },
  { t: '11:02', kind: 'agent', text: 'Pedi orçamento de 80 kg de palma forrageira pra 3 fornecedores.', meta: 'Damião R$ 96 · Outros R$ 112, 120' },
  { t: '10:14', kind: 'wait', text: 'Aguardando você aprovar: vacinação de 12 cabras contra raiva.' },
  { t: '09:32', kind: 'sense', text: 'Sensor da cisterna: nível 68%. Estimativa 14 dias sem chuva.' },
  { t: '07:14', kind: 'agent', text: 'Mandei o Carlinhos checar a cerca norte. Solto 2 estacas — vou avisar.' },
  { kind: 'div', t: 'ONTEM', tag: 'SEG 27/05' },
  { t: '18:22', kind: 'agent', text: 'Lancei a venda de 6 L de leite no caderno: Dona Lúcia · R$ 24.' },
  { t: '16:05', kind: 'sense', text: 'Pretinho comeu 30% menos no cocho. Marcado pra observar.', meta: '#042' },
  { t: '08:00', kind: 'agent', text: 'Soltei o rebanho no piquete leste. Pasto reservado por 4 dias.' },
]

interface DotConfig {
  bg: string
  icon: React.ReactNode
}

function getDotConfig(kind: EntryKind): DotConfig {
  switch (kind) {
    case 'agent':
      return {
        bg: '#2A4A36',
        icon: <SparkIcon size={10} stroke="#D6A23A" fill="#D6A23A" strokeWidth={1.5} />,
      }
    case 'sense':
      return {
        bg: '#D9E4EE',
        icon: <EyeIcon size={10} stroke="#3E6B91" strokeWidth={2} />,
      }
    case 'wait':
      return {
        bg: '#F2DCCB',
        icon: <BellIcon size={10} stroke="#C16A3F" strokeWidth={2} />,
      }
    default:
      return { bg: 'transparent', icon: null }
  }
}

interface TagConfig {
  bg: string
  text: string
  label: string
}

function getTagConfig(kind: EntryKind, customTag?: string): TagConfig {
  switch (kind) {
    case 'agent':
      return { bg: '#E9EFDF', text: '#2A4A36', label: customTag || 'AGIU' }
    case 'sense':
      return { bg: '#D9E4EE', text: '#3E6B91', label: customTag || 'OBSERVOU' }
    case 'wait':
      return { bg: '#F2DCCB', text: '#C16A3F', label: customTag || 'AGUARDA' }
    default:
      return { bg: 'transparent', text: 'transparent', label: '' }
  }
}

export default function DiarioScreen() {
  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="font-sans text-[12px] text-ink-mute uppercase tracking-wider font-medium">
          TRANSPARÊNCIA
        </div>
        <h1 className="font-head text-[32px] font-semibold text-ink tracking-tight mt-0.5">
          O que o Mandacaru fez
        </h1>
      </div>

      {/* Summary card */}
      <div className="mx-4 mt-3 bg-paper card-shadow rounded-xl p-3.5">
        <div className="flex justify-between items-center">
          <span className="font-sans text-[11.5px] text-ink-mute uppercase tracking-wider font-medium">
            Hoje · ter 28/05
          </span>
          <span className="font-mono text-[10.5px] text-ink-mute">até 14:31</span>
        </div>
        <div className="flex gap-x-6 mt-2.5">
          <div className="flex flex-col">
            <span className="font-head text-[24px] font-semibold leading-none text-green">14</span>
            <span className="font-sans text-[11px] text-ink-soft mt-1">ações executadas</span>
          </div>
          <div className="flex flex-col">
            <span className="font-head text-[24px] font-semibold leading-none text-terra">6</span>
            <span className="font-sans text-[11px] text-ink-soft mt-1">aguardando você</span>
          </div>
          <div className="flex flex-col">
            <span className="font-head text-[24px] font-semibold leading-none text-rain">22</span>
            <span className="font-sans text-[11px] text-ink-soft mt-1">medições</span>
          </div>
        </div>
      </div>

      {/* Date divider */}
      <div className="px-5 mt-4 mb-2 font-mono text-[10px] text-ink-mute font-semibold tracking-wider uppercase">
        HOJE · TER 28/05
      </div>

      {/* Timeline */}
      <div className="px-5 relative">
        {/* Vertical line */}
        <div className="absolute left-[28px] top-0 bottom-0 w-px bg-line" />

        {entries.map((entry, i) => {
          if (entry.kind === 'div') {
            return (
              <div key={i} className="font-mono text-[10px] text-ink-mute font-semibold tracking-wider uppercase py-3.5 pl-8">
                {entry.t} · {entry.tag}
              </div>
            )
          }

          const dot = getDotConfig(entry.kind)
          const tagCfg = getTagConfig(entry.kind, entry.tag)

          return (
            <div key={i} className="flex gap-3.5 mb-3.5 relative">
              {/* Dot */}
              <div
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-0.5"
                style={{ backgroundColor: dot.bg }}
              >
                {dot.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10.5px] text-ink-mute font-semibold">{entry.t}</span>
                  <span
                    className="font-mono text-[9px] font-bold tracking-wide px-1.5 py-px rounded-[4px]"
                    style={{ backgroundColor: tagCfg.bg, color: tagCfg.text }}
                  >
                    {tagCfg.label}
                  </span>
                </div>
                {entry.text && (
                  <p className="font-sans text-[13.5px] text-ink mt-0.5 leading-[1.4]">{entry.text}</p>
                )}
                {entry.meta && (
                  <div className="font-mono text-[10.5px] text-ink-soft mt-1">{entry.meta}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
