'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const { completeOnboarding } = useStore()
  const [mode, setMode] = useState<'landing' | 'signup'>('landing')
  const [farmName, setFarmName] = useState('')
  const [userName, setUserName] = useState('')

  function handleSignup() {
    if (!farmName.trim() || !userName.trim()) return
    completeOnboarding(farmName.trim(), userName.trim())
    onComplete()
  }

  const canSubmit = farmName.trim().length > 0 && userName.trim().length > 0

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#120802',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '28px 28px 0 0',
    boxShadow: '0 -12px 48px rgba(0,0,0,0.55)',
  }

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto flex flex-col relative overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #1A0804 0%, #4A1408 18%, #8B2E10 38%, #B85030 55%, #C87040 68%, #C8922A 82%, #C8A030 100%)',
      }}
    >
      {/* ── Grão de textura ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Ccircle cx='1' cy='1' r='0.7' fill='white' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundSize: '3px 3px',
        }}
      />

      {/* ── Sol: halo externo ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340, height: 340,
          bottom: '300px', left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(244,226,176,0.22) 0%, rgba(214,162,58,0.10) 50%, transparent 72%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ── Sol: disco bokeh ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200, height: 200,
          bottom: '350px', left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle at 38% 38%, #FAF6EC 0%, #F4E2B0 28%, #E8B84B 60%, #C8832A 85%, #A85820 100%)',
          filter: 'blur(44px)',
          boxShadow: '0 0 70px 36px rgba(232,184,75,0.30)',
        }}
      />

      {/* ── Mandacaru Esquerdo ── */}
      <div className="absolute left-[40px] w-[22px] h-[110px]"
        style={{ bottom: '130px', backgroundColor: '#120802', borderRadius: '11px 11px 0 0' }}>
        <div style={{ position: 'absolute', bottom: '30px', right: '-16px', width: '14px', height: '50px', backgroundColor: '#120802', borderRadius: '2px 7px 0 0' }} />
      </div>

      {/* ── Mandacaru Central ── */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[38px] h-[220px]"
        style={{ bottom: '120px', backgroundColor: '#120802', borderRadius: '19px 19px 0 0' }}>
        <div style={{ position: 'absolute', bottom: '60px', left: '-28px', width: '24px', height: '80px', transform: 'translateY(20px)', backgroundColor: '#120802', borderRadius: '2px 12px 0 0' }} />
        <div style={{ position: 'absolute', bottom: '60px', right: '-28px', width: '24px', height: '80px', transform: 'translateY(30px)', backgroundColor: '#120802', borderRadius: '2px 12px 0 0' }} />
      </div>

      {/* ── Mandacaru Direito ── */}
      <div className="absolute right-[40px] w-[16px] h-[70px]"
        style={{ bottom: '130px', backgroundColor: '#120802', borderRadius: '2px 8px 0 0' }} />

      {/* ── Flor ── */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full flex items-center justify-center"
        style={{ bottom: '335px', backgroundColor: '#F4EEDF', boxShadow: '0 0 28px rgba(244,236,221,0.65)' }}>
        <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: '#D6A23A' }} />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 pt-[110px] px-8 text-center">
        <h1
          className="font-display italic text-[56px] font-normal leading-none tracking-tight"
          style={{ color: '#F4EEDF', textShadow: '0 2px 28px rgba(0,0,0,0.50)' }}
        >
          Mandacaru
        </h1>
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase mt-3"
          style={{ color: 'rgba(244,238,223,0.55)' }}>
          Floresce antes da chuva
        </p>
      </div>

      {/* ── Área inferior ── */}
      <div className="mt-auto relative z-20 w-full">

        {mode === 'landing' ? (
          <div className="px-5 pb-[108px] text-center">
            <p className="font-display italic text-[26px] font-normal leading-[1.22] mb-6"
              style={{ color: '#F4EEDF', textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}>
              "Sua roça tem<br />quem cuida, agora."
            </p>
            <button
              className="w-full h-[56px] font-head text-[16px] font-semibold rounded-2xl cursor-pointer active:opacity-90 transition-opacity"
              style={{ backgroundColor: '#F4EEDF', color: '#120802', boxShadow: '0 6px 28px rgba(18,8,2,0.55)' }}
              onClick={() => setMode('signup')}
            >
              Criar minha conta
            </button>
          </div>
        ) : (
          <div className="w-full px-5 pt-7 pb-10 text-left" style={cardStyle}>
            <div className="flex items-center gap-3 mb-5">
              <button
                className="font-sans text-[16px] cursor-pointer"
                style={{ color: 'rgba(244,238,223,0.55)' }}
                onClick={() => setMode('landing')}
              >
                ←
              </button>
              <h2 className="font-head text-[20px] font-semibold" style={{ color: '#F4EEDF' }}>
                Criar sua conta
              </h2>
            </div>

            <label className="block mb-1.5 font-sans text-[11px] uppercase tracking-wide"
              style={{ color: 'rgba(244,238,223,0.6)' }}>
              Nome do sítio / fazenda
            </label>
            <input
              className="w-full rounded-xl px-4 py-3 font-sans text-[15px] mb-4 outline-none transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: '#F4EEDF' }}
              placeholder="Ex: Sítio Olho d'Água"
              value={farmName}
              onChange={e => setFarmName(e.target.value)}
              autoFocus
            />

            <label className="block mb-1.5 font-sans text-[11px] uppercase tracking-wide"
              style={{ color: 'rgba(244,238,223,0.6)' }}>
              Seu nome
            </label>
            <input
              className="w-full rounded-xl px-4 py-3 font-sans text-[15px] mb-6 outline-none transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: '#F4EEDF' }}
              placeholder="Ex: Joaquim"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && canSubmit) handleSignup() }}
            />

            <button
              className="w-full h-[56px] font-head text-[16px] font-semibold rounded-2xl transition-all"
              style={{
                backgroundColor: canSubmit ? '#F4EEDF' : 'rgba(255,255,255,0.12)',
                color: canSubmit ? '#120802' : 'rgba(244,238,223,0.4)',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
              }}
              onClick={handleSignup}
              disabled={!canSubmit}
            >
              Começar
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
