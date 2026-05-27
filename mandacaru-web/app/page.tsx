'use client'

import { useState } from 'react'
import { StoreProvider, useStore } from '@/lib/store'
import TabBar, { Tab } from '@/components/TabBar'
import HomeScreen from '@/screens/HomeScreen'
import ChatScreen from '@/screens/ChatScreen'
import ApproveScreen from '@/screens/ApproveScreen'
import FarmScreen from '@/screens/FarmScreen'
import DiarioScreen from '@/screens/DiarioScreen'

function SettingsModal({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings, resetData } = useStore()
  const [farmName, setFarmName] = useState(settings.farmName)
  const [userName, setUserName] = useState(settings.userName)

  function save() {
    updateSettings({
      farmName: farmName.trim() || settings.farmName,
      userName: userName.trim() || settings.userName,
    })
    onClose()
  }

  function handleReset() {
    if (typeof window !== 'undefined' && window.confirm('Resetar todos os dados da demo?')) {
      resetData()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-paper rounded-t-2xl w-full max-w-[430px] mx-auto p-5 pb-10">
        <div className="w-10 h-1 bg-sand rounded-full mx-auto mb-5" />
        <h2 className="font-head text-[20px] font-semibold text-ink mb-4">Configurações</h2>

        <label className="block mb-1 font-sans text-[11px] text-ink-mute uppercase tracking-wide">
          Nome da fazenda
        </label>
        <input
          className="w-full bg-cream border border-line-strong rounded-lg px-3 py-2.5 font-sans text-[15px] text-ink mb-3 outline-none focus:border-green"
          value={farmName}
          onChange={e => setFarmName(e.target.value)}
        />

        <label className="block mb-1 font-sans text-[11px] text-ink-mute uppercase tracking-wide">
          Seu nome
        </label>
        <input
          className="w-full bg-cream border border-line-strong rounded-lg px-3 py-2.5 font-sans text-[15px] text-ink mb-5 outline-none focus:border-green"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />

        <button
          className="w-full h-12 bg-green text-cream font-head text-[15px] font-semibold rounded-xl mb-3 cursor-pointer"
          onClick={save}
        >
          Salvar
        </button>
        <button
          className="w-full text-[12.5px] font-sans text-ink-mute text-center py-2 cursor-pointer"
          onClick={handleReset}
        >
          Resetar dados da demo
        </button>
      </div>
    </div>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showSettings, setShowSettings] = useState(false)
  const { pendingCount } = useStore()

  const navigate = (tab: Tab) => setActiveTab(tab)

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-cream relative">
      <div className="pb-24">
        {activeTab === 'home' && (
          <HomeScreen
            onNavigate={navigate}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        {activeTab === 'chat' && <ChatScreen onNavigate={navigate} />}
        {activeTab === 'approve' && <ApproveScreen onNavigate={navigate} />}
        {activeTab === 'farm' && <FarmScreen onNavigate={navigate} />}
        {activeTab === 'log' && <DiarioScreen />}
      </div>
      <TabBar active={activeTab} onTabChange={setActiveTab} pendingBadge={pendingCount} />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
