'use client'

import { HomeIcon, ChatIcon, BellIcon, PulseIcon } from '@/components/icons'
import { CactusIcon } from '@/components/icons'

export type Tab = 'home' | 'chat' | 'approve' | 'farm' | 'log'

interface TabBarProps {
  active: Tab
  onTabChange: (t: Tab) => void
  pendingBadge?: number
}

interface TabItem {
  id: Tab
  label: string
}

const tabs: TabItem[] = [
  { id: 'home', label: 'Início' },
  { id: 'chat', label: 'Conversa' },
  { id: 'approve', label: 'Aprovar' },
  { id: 'farm', label: 'Fazenda' },
  { id: 'log', label: 'Diário' },
]

function TabIcon({ id, isActive }: { id: Tab; isActive: boolean }) {
  const color = isActive ? '#2A4A36' : '#8A8F82'
  const size = 22

  switch (id) {
    case 'home':
      return <HomeIcon size={size} stroke={color} strokeWidth={1.8} />
    case 'chat':
      return <ChatIcon size={size} stroke={color} strokeWidth={1.8} />
    case 'approve':
      return <BellIcon size={size} stroke={color} strokeWidth={1.8} />
    case 'farm':
      return <CactusIcon size={size} stroke={color} strokeWidth={1.8} />
    case 'log':
      return <PulseIcon size={size} stroke={color} strokeWidth={1.8} />
  }
}

export default function TabBar({ active, onTabChange, pendingBadge = 0 }: TabBarProps) {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-paper/95 backdrop-blur-md border-t border-line z-50"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          const showBadge = tab.id === 'approve' && pendingBadge > 0
          return (
            <button
              key={tab.id}
              className="flex-1 flex flex-col items-center pt-2.5 pb-1 gap-1 cursor-pointer relative"
              onClick={() => onTabChange(tab.id)}
            >
              <div className="relative">
                <TabIcon id={tab.id} isActive={isActive} />
                {showBadge && (
                  <span className="absolute top-[-4px] right-[-6px] bg-terra text-white text-[9px] font-mono font-semibold rounded-full px-1 min-w-[15px] h-[15px] flex items-center justify-center">
                    {pendingBadge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-sans ${isActive ? 'font-semibold text-green' : 'text-ink-mute'}`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
