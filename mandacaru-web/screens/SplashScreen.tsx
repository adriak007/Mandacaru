'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'

// Silhueta do mandacaru — grande, proporcional para exibição em destaque
function MandacaruSilhouette() {
  return (
    <svg
      viewBox="0 0 100 260"
      fill="currentColor"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tronco principal */}
      <rect x="40" y="0" width="20" height="260" rx="10" />

      {/* Braço esquerdo — conector horizontal */}
      <rect x="10" y="88" width="38" height="14" rx="7" />
      {/* Braço esquerdo — coluna vertical */}
      <rect x="8" y="36" width="18" height="64" rx="9" />

      {/* Braço direito — conector horizontal */}
      <rect x="52" y="116" width="38" height="14" rx="7" />
      {/* Braço direito — coluna vertical */}
      <rect x="74" y="60" width="18" height="68" rx="9" />
    </svg>
  )
}

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
        background:
          'linear-gradient(180deg, #1A0804 0%, #4A1408 18%, #8B2E10 38%, #B85030 55%, #C87040 68%, #C8922A 82%, #C8A030 100%)',
      }}
    >
      {/* ── Grão de textura ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Ccircle cx='1' cy='1' r='0.7' fill='white' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundSize: '3px 3px',
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-20 pt-14 px-6 text-center">
        <h1
          className="font-serif text-[58px] font-semibold leading-none tracking-tight italic"
          style={{ color: '#F4EEDF', textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}
        >
          Mandacaru
        </h1>
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mt-2.5"
          style={{ color: 'rgba(244,238,223,0.5)' }}
        >
          Floresce antes da chuva
        </p>
      </div>

      {/* ── Cena: sol desfocado + mandacaru ── */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Halo externo difuso */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 360,
            height: 360,
            background:
              'radial-gradient(circle, rgba(244,226,176,0.18) 0%, rgba(214,162,58,0.08) 55%, transparent 75%)',
            filter: 'blur(30px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Sol desfocado — bokeh fotográfico */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 210,
            height: 210,
            background:
              'radial-gradient(circle at 38% 38%, #FAF6EC 0%, #F4E2B0 30%, #E8B84B 62%, #C8832A 88%, #A85820 100%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -58%)',
            boxShadow: '0 0 80px 40px rgba(232,184,75,0.28)',
          }}
        />

        {/* Mandacaru — silhueta grande */}
        <div
          className="absolute z-10"
          style={{
            width: 216,
            height: 510,
            color: '#120802',
            bottom: -150,
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'drop-shadow(0 -8px 24px rgba(18,8,2,0.9)) drop-shadow(4px 0 8px rgba(18,8,2,0.5))',
          }}
        >
          <MandacaruSilhouette />
        </div>

        {/* Frase em cima do sol (Estilo da segunda imagem) */}
        <div className="absolute bottom-12 z-20 text-center px-8 pointer-events-none">
          <p 
            className="font-serif text-[24px] italic leading-tight text-center"
            style={{ color: '#F4EEDF', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            “Sua roça tem <br /> quem cuida, agora.”
          </p>
        </div>
      </div>

      {/* ── Seção Inferior Dinâmica ── */}
      <div className="relative z-30 px-6 pb-8 flex flex-col items-center">
        {mode === 'landing' ? (
          <>
            {/* Card com o botão de Criar Conta (Estilo claro do segundo print) */}
            <div
              className="w-full bg-[#F4EEDF] p-4 flex items-center justify-center"
              style={{
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <button
                className="w-full h-[54px] bg-transparent text-[#120802] font-sans text-[16px] font-bold rounded-2xl cursor-pointer active:opacity-80 transition-opacity"
                onClick={() => setMode('signup')}
              >
                Criar minha conta
              </button>
            </div>

          </>
        ) : (
          /* Form de Cadastro (Mantido caso o usuário clique em prosseguir) */
          <div
            className="w-full bg-[#F4EEDF] p-5"
            style={{
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <button
                className="text-[16px] font-sans text-[#120802]/60 cursor-pointer"
                onClick={() => setMode('landing')}
              >
                ←
              </button>
              <h2 className="font-sans text-[18px] font-bold text-[#120802]">Criar sua conta</h2>
            </div>

            <label className="block mb-1.5 font-sans text-[11px] text-[#120802]/60 uppercase tracking-wide font-semibold">
              Nome do sítio / fazenda
            </label>
            <input
              className="w-full bg-white/60 border border-black/10 rounded-xl px-4 py-3 font-sans text-[15px] text-[#120802] mb-3.5 outline-none focus:border-[#4A1408] transition-colors"
              placeholder="Ex: Sítio Olho d'Água"
              value={farmName}
              onChange={e => setFarmName(e.target.value)}
              autoFocus
            />

            <label className="block mb-1.5 font-sans text-[11px] text-[#120802]/60 uppercase tracking-wide font-semibold">
              Seu nome
            </label>
            <input
              className="w-full bg-white/60 border border-black/10 rounded-xl px-4 py-3 font-sans text-[15px] text-[#120802] mb-6 outline-none focus:border-[#4A1408] transition-colors"
              placeholder="Ex: Joaquim"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && canSubmit) handleSignup() }}
            />

            <button
              className={`w-full h-[50px] font-sans text-[16px] font-bold rounded-xl cursor-pointer transition-all ${
                canSubmit ? 'bg-[#1A0804] text-[#F4EEDF]' : 'bg-black/10 text-black/40 cursor-not-allowed'
              }`}
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