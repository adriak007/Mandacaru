'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore, Message } from '@/lib/store'
import AgentMark from '@/components/AgentMark'
import { VoiceIcon, MicIcon, SendIcon } from '@/components/icons'
import { Tab } from '@/components/TabBar'

interface ChatScreenProps {
  onNavigate: (tab: Tab) => void
}

function Waveform() {
  const heights = [4, 8, 12, 16, 20, 16, 12, 20, 24, 18, 14, 20, 16, 12, 8, 16, 20, 14, 10, 16, 20, 12, 8, 6]
  return (
    <div className="flex items-center gap-[2px]">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{ width: 2, height: h, backgroundColor: '#D6A23A', opacity: 0.8 }}
        />
      ))}
    </div>
  )
}

function BubbleAgent({ msg }: { msg: Message }) {
  const { confirmAttachment } = useStore()
  return (
    <div className="flex items-end gap-2">
      <AgentMark size={24} variant="logo" />
      <div className="max-w-[78%]">
        {msg.text && (
          <div className="bg-paper text-ink rounded-[10px] rounded-bl-[4px] card-shadow p-3 text-[14.5px] font-sans leading-[1.35]">
            {msg.text}
          </div>
        )}
        {msg.attachment && (
          <div className="bg-green-bg border border-line-strong rounded-[7px] p-3 mt-1.5">
            <div className="text-[10.5px] font-sans font-semibold text-ink-soft uppercase tracking-wide">
              {msg.attachment.detail}
            </div>
            <div className="font-head text-[14.5px] font-semibold text-green mt-0.5">
              {msg.attachment.title}
            </div>
            <div className="text-[12px] font-sans text-ink-soft mt-0.5">
              {msg.attachment.subtitle}
            </div>
            {!msg.attachment.confirmed ? (
              <div className="flex gap-2 mt-2.5">
                <button
                  className="flex-1 h-8 bg-green text-cream text-[12.5px] font-head font-semibold rounded-[6px] cursor-pointer"
                  onClick={() => confirmAttachment(msg.id)}
                >
                  Confirmar
                </button>
                <button className="h-8 px-3 text-[12.5px] font-head font-semibold text-ink-soft border border-line-strong rounded-[6px] cursor-pointer">
                  Mudar
                </button>
              </div>
            ) : (
              <div className="mt-2 text-[12px] font-sans text-green font-semibold">✓ Confirmado</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function BubbleUser({ msg }: { msg: Message }) {
  if (msg.isVoice) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] bg-green text-cream rounded-[10px] rounded-br-[4px] p-3">
          <div className="flex items-center gap-2.5">
            <MicIcon size={18} stroke="#D6A23A" strokeWidth={2} />
            <Waveform />
            <span className="font-mono text-[11px] text-gold-tint">{msg.duration}</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] bg-green text-cream rounded-[10px] rounded-br-[4px] p-3 text-[14.5px] font-sans">
        {msg.text}
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
          <div className="w-1.5 h-1.5 rounded-full bg-ink-mute opacity-50 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-ink-mute opacity-50 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-ink-mute opacity-50 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

const quickPrompts = ['Vai chover essa semana?', 'Como tá a cisterna?', 'Comprar ração']

export default function ChatScreen({ onNavigate: _onNavigate }: ChatScreenProps) {
  const { messages, isTyping, sendMessage } = useStore()
  const [inputText, setInputText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = inputText.trim()
    if (!text) return
    setInputText('')
    sendMessage(text)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleQuickPrompt(prompt: string) {
    sendMessage(prompt)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-line sticky top-0 bg-cream z-10">
        <AgentMark size={40} variant="logo" pulse />
        <div className="flex flex-col flex-1">
          <span className="font-head text-[16px] font-semibold text-ink">Mandacaru</span>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-terra animate-pulse' : 'bg-gold'}`} />
            <span className="text-[12px] text-ink-soft font-sans">
              {isTyping ? 'digitando…' : 'ouvindo · responde em português'}
            </span>
          </div>
        </div>
        <VoiceIcon size={22} stroke="#2A4A36" strokeWidth={1.8} />
      </div>

      {/* Date pill */}
      <div className="text-center py-3.5">
        <span className="inline-block bg-sand text-ink-mute text-[11px] font-sans font-medium tracking-wider rounded-full px-3 py-1">
          HOJE · {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Messages */}
      <div className="px-4 flex flex-col gap-2.5 pb-2">
        {messages.map(msg => (
          msg.role === 'agent'
            ? <BubbleAgent key={msg.id} msg={msg} />
            : <BubbleUser key={msg.id} msg={msg} />
        ))}
        {isTyping && <BubbleTyping />}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-24 left-0 right-0 px-3.5 pb-3 pt-1 bg-gradient-to-t from-cream via-cream/90 to-transparent mt-4">
        {/* Quick prompts */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              className="shrink-0 bg-paper card-shadow text-ink-soft text-[12px] font-sans font-medium rounded-full px-3 py-1.5 cursor-pointer whitespace-nowrap active:bg-sand"
              onClick={() => handleQuickPrompt(prompt)}
              disabled={isTyping}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input pill */}
        <div className="flex items-center gap-2 bg-paper rounded-full px-4 py-1.5 card-shadow">
          <input
            ref={inputRef}
            className="flex-1 text-[14px] font-sans text-ink bg-transparent outline-none placeholder:text-ink-mute"
            placeholder="Pergunte ou peça pra fazer…"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
              inputText.trim() ? 'bg-green' : 'bg-sand'
            }`}
            style={inputText.trim() ? { boxShadow: '0 4px 14px rgba(42,74,54,0.4)' } : {}}
            onClick={handleSend}
            disabled={isTyping}
          >
            {inputText.trim()
              ? <SendIcon size={18} stroke="#FAF6EC" strokeWidth={2} />
              : <MicIcon size={22} stroke="#8A8F82" strokeWidth={2} />
            }
          </button>
        </div>
      </div>
    </div>
  )
}
