'use client'

import AgentMark from '@/components/AgentMark'
import { VoiceIcon, MicIcon } from '@/components/icons'

// Waveform SVG bars
function Waveform() {
  const heights = [4, 8, 12, 16, 20, 16, 12, 20, 24, 18, 14, 20, 16, 12, 8, 16, 20, 14, 10, 16, 20, 12, 8, 6]
  return (
    <div className="flex items-center gap-[2px]">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 2,
            height: h,
            backgroundColor: '#D6A23A',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  )
}

interface BubbleAgentProps {
  children: React.ReactNode
  attachment?: boolean
}

function BubbleAgent({ children, attachment }: BubbleAgentProps) {
  return (
    <div className="flex items-end gap-2">
      <AgentMark size={24} variant="logo" />
      <div className="max-w-[78%]">
        <div className="bg-paper text-ink rounded-[10px] rounded-bl-[4px] card-shadow p-3 text-[14.5px] font-sans leading-[1.35]">
          {children}
        </div>
        {attachment && (
          <div className="bg-green-bg border border-line-strong rounded-[7px] p-3 mt-1.5">
            <div className="text-[10.5px] font-sans font-semibold text-ink-soft uppercase tracking-wide">
              VOU MARCAR ISTO
            </div>
            <div className="font-head text-[14.5px] font-semibold text-green mt-0.5">
              Reboque de água — sábado 07:00
            </div>
            <div className="text-[12px] font-sans text-ink-soft mt-0.5">
              2 000 L · Açude do Zé · R$ 40
            </div>
            <div className="flex gap-2 mt-2.5">
              <button className="flex-1 h-8 bg-green text-cream text-[12.5px] font-head font-semibold rounded-[6px]">
                Confirmar
              </button>
              <button className="h-8 px-3 text-[12.5px] font-head font-semibold text-ink-soft border border-line-strong rounded-[6px]">
                Mudar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BubbleUser({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] bg-green text-cream rounded-[10px] rounded-br-[4px] p-3 text-[14.5px] font-sans">
        {children}
      </div>
    </div>
  )
}

function BubbleVoice({ duration }: { duration: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] bg-green text-cream rounded-[10px] rounded-br-[4px] p-3">
        <div className="flex items-center gap-2.5">
          <MicIcon size={18} stroke="#D6A23A" strokeWidth={2} />
          <Waveform />
          <span className="font-mono text-[11px] text-gold-tint">{duration}</span>
        </div>
      </div>
    </div>
  )
}

function BubbleTyping() {
  return (
    <div className="flex items-end gap-2">
      <AgentMark size={24} variant="logo" />
      <div className="bg-paper card-shadow rounded-[10px] rounded-bl-[4px] p-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-ink-mute opacity-50" />
          <div className="w-1.5 h-1.5 rounded-full bg-ink-mute opacity-50" />
          <div className="w-1.5 h-1.5 rounded-full bg-ink-mute opacity-50" />
        </div>
      </div>
    </div>
  )
}

const quickPrompts = ['Vai chover essa semana?', 'Como tá a cisterna?', 'Comprar ração']

export default function ChatScreen() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-line sticky top-0 bg-cream z-10">
        <AgentMark size={40} variant="logo" pulse />
        <div className="flex flex-col flex-1">
          <span className="font-head text-[16px] font-semibold text-ink">Mandacaru</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[12px] text-ink-soft font-sans">ouvindo · responde em português</span>
          </div>
        </div>
        <VoiceIcon size={22} stroke="#2A4A36" strokeWidth={1.8} />
      </div>

      {/* Date pill */}
      <div className="text-center py-3.5">
        <span className="inline-block bg-sand text-ink-mute text-[11px] font-sans font-medium tracking-wider rounded-full px-3 py-1">
          HOJE · 14:31
        </span>
      </div>

      {/* Messages */}
      <div className="px-4 flex flex-col gap-2.5">
        <BubbleAgent>
          Seu Joaquim, vinha lhe avisar: a cisterna baixou pra{' '}
          <span className="text-green font-semibold">68%</span>. Sem chuva prevista nos próximos 9 dias.
        </BubbleAgent>

        <BubbleAgent>
          Quer que eu mande o Carlinhos rebocar mais água lá do açude do compadre Zé?
        </BubbleAgent>

        <BubbleVoice duration="0:08" />

        <BubbleAgent>
          Entendido. Marquei pra{' '}
          <span className="text-green font-semibold">sábado de manhã</span>. Já reservei 2 mil litros com seu Zé —{' '}
          R$ 40.
        </BubbleAgent>

        <BubbleAgent attachment>
          {/* empty — attachment only */}
          <span className="sr-only">Agendamento confirmado</span>
        </BubbleAgent>

        <BubbleUser>E a palma, tá precisando de água?</BubbleUser>

        <BubbleTyping />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-24 left-0 right-0 px-3.5 pb-3 pt-1 bg-gradient-to-t from-cream via-cream/90 to-transparent mt-4">
        {/* Quick prompts */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              className="shrink-0 bg-paper card-shadow text-ink-soft text-[12px] font-sans font-medium rounded-full px-3 py-1.5 cursor-pointer whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input pill */}
        <div className="flex items-center gap-2 bg-paper rounded-full px-4 py-1.5 card-shadow">
          <span className="flex-1 text-[14px] font-sans text-ink-mute">
            Pergunte ou peça pra fazer…
          </span>
          <button
            className="w-11 h-11 rounded-full bg-green flex items-center justify-center flex-shrink-0"
            style={{ boxShadow: '0 4px 14px rgba(42,74,54,0.4)' }}
          >
            <MicIcon size={22} stroke="#D6A23A" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
