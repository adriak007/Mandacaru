'use client'

import { useStore, DiaryEntry } from '@/lib/store'
import { SparkIcon, EyeIcon, BellIcon } from '@/components/icons'

type EntryKind = DiaryEntry['kind']

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

function todayDateLabel() {
  return new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }).toUpperCase()
}

export default function DiarioScreen() {
  const { diaryEntries, pendingCount } = useStore()

  // Split entries: before first 'div' = today, rest = past
  const firstDivIdx = diaryEntries.findIndex(e => e.kind === 'div')
  const todayEntries = firstDivIdx >= 0 ? diaryEntries.slice(0, firstDivIdx) : diaryEntries
  const pastEntries = firstDivIdx >= 0 ? diaryEntries.slice(firstDivIdx) : []

  const actionsCount = todayEntries.filter(e => e.kind === 'agent').length
  const sensorsCount = todayEntries.filter(e => e.kind === 'sense').length + 20
  const now = new Date()
  const timeLabel = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

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
            Hoje · {todayDateLabel()}
          </span>
          <span className="font-mono text-[10.5px] text-ink-mute">até {timeLabel}</span>
        </div>
        <div className="flex gap-x-6 mt-2.5">
          <div className="flex flex-col">
            <span className="font-head text-[24px] font-semibold leading-none text-green">{actionsCount}</span>
            <span className="font-sans text-[11px] text-ink-soft mt-1">ações executadas</span>
          </div>
          <div className="flex flex-col">
            <span className="font-head text-[24px] font-semibold leading-none text-terra">{pendingCount}</span>
            <span className="font-sans text-[11px] text-ink-soft mt-1">aguardando você</span>
          </div>
          <div className="flex flex-col">
            <span className="font-head text-[24px] font-semibold leading-none text-rain">{sensorsCount}</span>
            <span className="font-sans text-[11px] text-ink-soft mt-1">medições</span>
          </div>
        </div>
      </div>

      {/* Date divider — today */}
      <div className="px-5 mt-4 mb-2 font-mono text-[10px] text-ink-mute font-semibold tracking-wider uppercase">
        HOJE · {todayDateLabel()}
      </div>

      {/* Timeline */}
      <div className="px-5 relative">
        <div className="absolute left-[28px] top-0 bottom-0 w-px bg-line" />

        {todayEntries.length === 0 && (
          <div className="pl-8 text-[13px] font-sans text-ink-mute py-2">
            Nenhuma ação registrada ainda hoje.
          </div>
        )}

        {todayEntries.map((entry) => {
          const dot = getDotConfig(entry.kind)
          const tagCfg = getTagConfig(entry.kind, entry.tag)

          return (
            <div key={entry.id} className="flex gap-3.5 mb-3.5 relative">
              <div
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-0.5"
                style={{ backgroundColor: dot.bg }}
              >
                {dot.icon}
              </div>
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

        {/* Past entries (with dividers) */}
        {pastEntries.map((entry, i) => {
          if (entry.kind === 'div') {
            return (
              <div key={entry.id ?? i} className="font-mono text-[10px] text-ink-mute font-semibold tracking-wider uppercase py-3.5 pl-8">
                {entry.t} · {entry.tag}
              </div>
            )
          }

          const dot = getDotConfig(entry.kind)
          const tagCfg = getTagConfig(entry.kind, entry.tag)

          return (
            <div key={entry.id} className="flex gap-3.5 mb-3.5 relative">
              <div
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-0.5"
                style={{ backgroundColor: dot.bg }}
              >
                {dot.icon}
              </div>
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
