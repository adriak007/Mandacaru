'use client'

import { useState } from 'react'
import TabBar, { Tab } from '@/components/TabBar'
import HomeScreen from '@/screens/HomeScreen'
import ChatScreen from '@/screens/ChatScreen'
import ApproveScreen from '@/screens/ApproveScreen'
import FarmScreen from '@/screens/FarmScreen'
import DiarioScreen from '@/screens/DiarioScreen'

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-cream relative">
      <div className="pb-24">
        {activeTab === 'home' && <HomeScreen onNavigate={setActiveTab} />}
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'approve' && <ApproveScreen onNavigate={setActiveTab} />}
        {activeTab === 'farm' && <FarmScreen />}
        {activeTab === 'log' && <DiarioScreen />}
      </div>
      <TabBar active={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
