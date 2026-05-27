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

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto flex flex-col relative overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #C44A23 0%, #8E3D20 60%, #5C2812 100%)',
        color: 'var(--areia, #F4EEDF)',
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

      {/* ── Efeito de iluminação no horizonte ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[280px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 500px 400px at 50% 80%, rgba(232, 201, 124, 0.25), transparent 60%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[280px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(43, 24, 16, 0.3) 40%, var(--sertao, #120802) 100%)'
        }}
      />

      {/* ── Sol ── */}
      <div
        className="absolute rounded-full pointer-events-none opacity-80"
        style={{
          width: '180px',
          height: '180px',
          bottom: '380px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, var(--flor, #FAF6EC) 0%, var(--terracota-soft, #B85030) 70%, transparent 80%)',
        }}
      />

      {/* ── Mandacaru Esquerdo ── */}
      <div
        className="absolute left-[40px] w-[22px] h-[110px]"
        style={{
          bottom: '130px',
          backgroundColor: 'var(--sertao, #120802)',
          borderRadius: '11px 11px 0 0'
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '-16px',
            width: '14px',
            height: '50px',
            backgroundColor: 'var(--sertao, #120802)',
            borderRadius: '2px 7px 0 0'
          }}
        />
      </div>

      {/* ── Mandacaru Central Principal ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[38px] h-[220px]"
        style={{
          bottom: '120px',
          backgroundColor: 'var(--sertao, #120802)',
          borderRadius: '19px 19px 0 0',
        }}
      >
        {/* Braço Esquerdo */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '-28px',
            width: '24px',
            height: '80px',
            transform: 'translateY(20px)',
            backgroundColor: 'var(--sertao, #120802)',
            borderRadius: '2px 12px 0 0'
          }}
        />
        {/* Braço Direito */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '-28px',
            width: '24px',
            height: '80px',
            transform: 'translateY(30px)',
            backgroundColor: 'var(--sertao, #120802)',
            borderRadius: '2px 12px 0 0'
          }}
        />
      </div>

      {/* ── Mandacaru Direito ── */}
      <div
        className="absolute right-[40px] w-[16px] h-[70px]"
        style={{
          bottom: '130px',
          backgroundColor: 'var(--sertao, #120802)',
          borderRadius: '2px 8px 0 0'
        }}
      />

      {/* ── Flor no topo do mandacaru principal ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full flex items-center justify-center"
        style={{
          bottom: '335px',
          backgroundColor: 'var(--areia, #F4EEDF)',
          boxShadow: '0 0 30px rgba(244, 236, 221, 0.6)'
        }}
      >
        <div
          className="w-[8px] h-[8px] rounded-full"
          style={{ backgroundColor: 'var(--flor, #E8B84B)' }}
        />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 pt-[110px] px-8 text-center">
        <h1
          className="text-[56px] font-normal leading-none tracking-tight italic"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: 'var(--areia, #F4EEDF)',
          }}
        >
          Mandacaru
        </h1>
        <p
          className="text-[11px] uppercase mt-3.5 opacity-70"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.24em'
          }}
        >
          Floresce antes da chuva
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto relative z-20 px-8 pb-[108px] text-center w-full">

        <p
          className="text-[26px] italic leading-[1.15] mb-6"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: 'var(--areia, #F4EEDF)'
          }}
        >
          "Sua roça tem <br /> quem cuida, agora."
        </p>

        <div className="flex flex-col gap-[10px] w-full">
          {mode === 'landing' ? (
            <>
              <button
                className="w-full h-[56px] font-semibold text-[15px] flex items-center justify-center transition-opacity active:opacity-90 cursor-pointer"
                style={{
                  borderRadius: '10px',
                  backgroundColor: 'var(--areia, #F4EEDF)',
                  color: 'var(--sertao, #120802)',
                }}
                onClick={() => setMode('signup')}
              >
                Criar minha conta
              </button>

</>
          ) : (
            <div
              className="w-full text-left p-5"
              style={{
                backgroundColor: 'var(--sertao, #120802)',
                border: '1px solid var(--linha-2, rgba(255,255,255,0.1))',
                borderRadius: '2px',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <button
                  className="text-[16px] cursor-pointer"
                  style={{ color: 'var(--areia, #F4EEDF)' }}
                  onClick={() => setMode('landing')}
                >
                  ←
                </button>
                <h2 className="text-[18px] font-bold" style={{ color: 'var(--areia, #F4EEDF)' }}>Criar sua conta</h2>
              </div>

              <label className="block mb-1.5 text-[11px] uppercase tracking-wide opacity-75">
                Nome do sítio / fazenda
              </label>
              <input
                className="w-full border rounded-sm px-4 py-3 text-[15px] mb-3.5 bg-transparent outline-none transition-colors"
                style={{
                  color: 'var(--areia, #F4EEDF)',
                  borderColor: 'var(--linha-2, rgba(255,255,255,0.2))'
                }}
                placeholder="Ex: Sítio Olho d'Água"
                value={farmName}
                onChange={e => setFarmName(e.target.value)}
                autoFocus
              />

              <label className="block mb-1.5 text-[11px] uppercase tracking-wide opacity-75">
                Seu nome
              </label>
              <input
                className="w-full border rounded-sm px-4 py-3 text-[15px] mb-6 bg-transparent outline-none transition-colors"
                style={{
                  color: 'var(--areia, #F4EEDF)',
                  borderColor: 'var(--linha-2, rgba(255,255,255,0.2))'
                }}
                placeholder="Ex: Joaquim"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && canSubmit) handleSignup() }}
              />

              <button
                className={`w-full h-[52px] text-[15px] font-semibold flex items-center justify-center transition-all ${
                  canSubmit ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'
                }`}
                style={{
                  borderRadius: '2px',
                  backgroundColor: canSubmit ? 'var(--areia, #F4EEDF)' : 'var(--linha-2, rgba(255,255,255,0.1))',
                  color: canSubmit ? 'var(--sertao, #120802)' : 'var(--areia, #F4EEDF)',
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
    </div>
  )
}
