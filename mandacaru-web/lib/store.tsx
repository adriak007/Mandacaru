'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type DecisionCategory = 'compras' | 'saude' | 'plantio'
export type DecisionStatus = 'pending' | 'approved' | 'rejected'

export interface Decision {
  id: string
  category: DecisionCategory
  tagText: string
  tagColor: string
  iconType: 'coins' | 'pulse' | 'plant'
  iconBg: string
  title: string
  reason: string
  cost: string
  when: string
  status: DecisionStatus
}

export interface Message {
  id: string
  role: 'agent' | 'user'
  text: string
  timestamp: string
  isVoice?: boolean
  duration?: string
  attachment?: {
    title: string
    subtitle: string
    detail: string
    confirmed?: boolean
  }
}

export type DiaryKind = 'agent' | 'sense' | 'wait' | 'div'

export interface DiaryEntry {
  id: string
  t: string
  tag?: string
  kind: DiaryKind
  text?: string
  meta?: string
}

export interface AppSettings {
  farmName: string
  userName: string
}

// ─── Context interface ────────────────────────────────────────────────────────

interface StoreContextValue {
  decisions: Decision[]
  messages: Message[]
  diaryEntries: DiaryEntry[]
  dismissedAlerts: string[]
  settings: AppSettings
  pendingCount: number
  isTyping: boolean
  approveDecision: (id: string) => void
  rejectDecision: (id: string) => void
  sendMessage: (text: string) => void
  confirmAttachment: (messageId: string) => void
  dismissAlert: (id: string) => void
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void
  updateSettings: (s: Partial<AppSettings>) => void
  resetData: () => void
}

// ─── Initial data ─────────────────────────────────────────────────────────────

const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'd1', category: 'compras',
    tagText: 'COMPRA · URGENTE', tagColor: '#C16A3F',
    iconType: 'coins', iconBg: '#F2DCCB',
    title: 'Comprar 80 kg de palma forrageira',
    reason: 'A palma da fazenda chega no fim em 12 dias. Sr. Damião tem estoque por R$ 1,20/kg — preço normal.',
    cost: 'R$ 96,00', when: 'entrega quinta · 26/05',
    status: 'pending',
  },
  {
    id: 'd2', category: 'saude',
    tagText: 'SAÚDE DO REBANHO', tagColor: '#3E6B91',
    iconType: 'pulse', iconBg: '#D9E4EE',
    title: 'Vacinar 12 cabras contra raiva',
    reason: 'Reforço anual vence em 6 dias. Veterinária Dra. Cida tem agenda livre sábado.',
    cost: 'R$ 144,00', when: 'sábado · 31/05 · 08:00',
    status: 'pending',
  },
  {
    id: 'd3', category: 'plantio',
    tagText: 'PLANTIO', tagColor: '#2A4A36',
    iconType: 'plant', iconBg: '#E9EFDF',
    title: 'Adiar plantio de feijão de corda',
    reason: 'Previsão de chuva pra próxima quinzena tá baixa (8mm acumulado). Plantar agora arrisca a germinação.',
    cost: '—', when: 'reavaliar em 7 dias',
    status: 'pending',
  },
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1', role: 'agent',
    text: 'Seu Joaquim, vinha lhe avisar: a cisterna baixou pra 68%. Sem chuva prevista nos próximos 9 dias.',
    timestamp: '14:31',
  },
  {
    id: 'm2', role: 'agent',
    text: 'Quer que eu mande o Carlinhos rebocar mais água lá do açude do compadre Zé?',
    timestamp: '14:31',
  },
  {
    id: 'm3', role: 'user', text: '0:08', isVoice: true, duration: '0:08',
    timestamp: '14:32',
  },
  {
    id: 'm4', role: 'agent',
    text: 'Entendido. Marquei pra sábado de manhã. Já reservei 2 mil litros com seu Zé — R$ 40.',
    timestamp: '14:32',
    attachment: {
      title: 'Reboque de água — sábado 07:00',
      subtitle: '2 000 L · Açude do Zé · R$ 40',
      detail: 'VOU MARCAR ISTO',
    },
  },
  {
    id: 'm5', role: 'user',
    text: 'E a palma, tá precisando de água?',
    timestamp: '14:33',
  },
]

const INITIAL_DIARY: DiaryEntry[] = [
  { id: 'e1', t: '14:31', tag: 'AGORA', kind: 'agent', text: 'Você pediu reboque de água. Reservei com Sr. Zé pra sábado 07:00.', meta: '2 000 L · R$ 40' },
  { id: 'e2', t: '13:48', kind: 'sense', text: 'Conferi previsão do INMET. 8 mm acumulado em 7 dias. Abaixei a meta de rega da palma.' },
  { id: 'e3', t: '11:02', kind: 'agent', text: 'Pedi orçamento de 80 kg de palma forrageira pra 3 fornecedores.', meta: 'Damião R$ 96 · Outros R$ 112, 120' },
  { id: 'e4', t: '10:14', kind: 'wait', text: 'Aguardando você aprovar: vacinação de 12 cabras contra raiva.' },
  { id: 'e5', t: '09:32', kind: 'sense', text: 'Sensor da cisterna: nível 68%. Estimativa 14 dias sem chuva.' },
  { id: 'e6', t: '07:14', kind: 'agent', text: 'Mandei o Carlinhos checar a cerca norte. Solto 2 estacas — vou avisar.' },
  { id: 'div1', t: 'ONTEM', tag: 'SEG 27/05', kind: 'div' },
  { id: 'e7', t: '18:22', kind: 'agent', text: 'Lancei a venda de 6 L de leite no caderno: Dona Lúcia · R$ 24.' },
  { id: 'e8', t: '16:05', kind: 'sense', text: 'Pretinho comeu 30% menos no cocho. Marcado pra observar.', meta: '#042' },
  { id: 'e9', t: '08:00', kind: 'agent', text: 'Soltei o rebanho no piquete leste. Pasto reservado por 4 dias.' },
]

const DEFAULT_SETTINGS: AppSettings = {
  farmName: "Sítio Olho d'Água",
  userName: 'Seu Joaquim',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const nowTime = () => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

let _uid = Date.now()
const uid = () => String(++_uid)

function getAutoResponse(text: string, userName: string): string {
  const firstName = userName.replace(/^seu\s+/i, '')

  const presets: Record<string, string> = {
    'Vai chover essa semana?': 'A previsão do INMET mostra só 8 mm nos próximos 7 dias — muito abaixo do normal. Vou manter o monitoramento da cisterna e da palma.',
    'Como tá a cisterna?': 'A cisterna principal tá em 68%, cerca de 11.200 litros. Com o consumo atual, dura 14 dias. O reboque de sábado reforça mais 2.000 litros.',
    'Comprar ração': `Pode me dizer quanto de ração e qual tipo, ${firstName}? Verifico os preços com os fornecedores habituais e trago as melhores opções pra você aprovar.`,
  }
  if (presets[text]) return presets[text]

  const responses: [RegExp, string][] = [
    [/chuva|tempo|clima|previsão|previsao/i, 'Tô de olho na previsão. Próximos 7 dias com pouca chuva — máximo 8 mm acumulado. Vou avisar se mudar.'],
    [/cisterna|água|agua/i, 'A cisterna principal tá em 68%, uns 11.200 L. Com o reboque de sábado, subimos pra 79% — uns 18 dias de reserva.'],
    [/cabra|rebanho|animal|gado|pretinho|florzinha/i, 'O rebanho tem 47 cabeças. 43 saudáveis, 3 em observação e o Cravinho em tratamento de giárdia.'],
    [/palma|planta|cultivo|roça/i, 'A palma tá bem nas 2,1 ha. Reduzi a rega de 4× pra 3× por semana pela seca — economiza ~600 L. Colheita em 18 dias.'],
    [/ração|racao|compra|preço|preco/i, 'Vou verificar os preços com os fornecedores habituais e traço as melhores opções em breve.'],
    [/vacin|saúde|doença|doenca/i, 'A vacinação das cabras contra raiva vence em 6 dias. Tô aguardando a sua aprovação pra agendar com a Dra. Cida no sábado.'],
    [/leite/i, 'A produção de leite tá em 1,8 L/dia por cabra leiteira. Mariquinha tá produzindo bem.'],
    [/exame|fezes|parasita/i, 'O exame de fezes do rebanho foi agendado. Vou confirmar a data com o veterinário e te aviso.'],
    [/olá|oi|bom dia|boa tarde|boa noite|tudo bem/i, `Oi, ${firstName}! Tudo certo por aqui. A fazenda tá em dia. Tem alguma coisa que precisa resolver?`],
  ]

  for (const [re, resp] of responses) {
    if (re.test(text)) return resp
  }
  return `Entendido, ${firstName}. Vou verificar isso e te aviso assim que tiver novidade.`
}

// ─── Persistence ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'mandacaru_v1'

interface Persisted {
  decisions: Decision[]
  messages: Message[]
  diaryEntries: DiaryEntry[]
  dismissedAlerts: string[]
  settings: AppSettings
}

function loadFromStorage(): Persisted {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) return JSON.parse(raw) as Persisted
  } catch {}
  return {
    decisions: INITIAL_DECISIONS,
    messages: INITIAL_MESSAGES,
    diaryEntries: INITIAL_DIARY,
    dismissedAlerts: [],
    settings: DEFAULT_SETTINGS,
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [decisions, setDecisions] = useState<Decision[]>(INITIAL_DECISIONS)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(INITIAL_DIARY)
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [isTyping, setIsTyping] = useState(false)
  const settingsRef = useRef(settings)

  useEffect(() => { settingsRef.current = settings }, [settings])

  useEffect(() => {
    const s = loadFromStorage()
    setDecisions(s.decisions)
    setMessages(s.messages)
    setDiaryEntries(s.diaryEntries)
    setDismissedAlerts(s.dismissedAlerts)
    setSettings(s.settings)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        decisions, messages, diaryEntries, dismissedAlerts, settings,
      }))
    } catch {}
  }, [ready, decisions, messages, diaryEntries, dismissedAlerts, settings])

  const pendingCount = decisions.filter(d => d.status === 'pending').length

  const approveDecision = useCallback((id: string) => {
    setDecisions(prev => {
      const d = prev.find(x => x.id === id)
      if (!d || d.status !== 'pending') return prev
      const t = nowTime()
      setDiaryEntries(e => [{
        id: uid(), t, kind: 'agent',
        text: `Você aprovou: ${d.title}.`,
        meta: d.cost !== '—' ? d.cost : undefined,
      }, ...e])
      return prev.map(x => x.id === id ? { ...x, status: 'approved' } : x)
    })
  }, [])

  const rejectDecision = useCallback((id: string) => {
    setDecisions(prev => {
      const d = prev.find(x => x.id === id)
      if (!d || d.status !== 'pending') return prev
      const t = nowTime()
      setDiaryEntries(e => [{
        id: uid(), t, kind: 'sense',
        text: `Você recusou: ${d.title}.`,
      }, ...e])
      return prev.map(x => x.id === id ? { ...x, status: 'rejected' } : x)
    })
  }, [])

  const sendMessage = useCallback((text: string) => {
    const t = nowTime()
    setMessages(prev => [...prev, { id: uid(), role: 'user', text, timestamp: t }])
    setIsTyping(true)
    const delay = 900 + Math.random() * 900
    const userName = settingsRef.current.userName
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: uid(), role: 'agent',
        text: getAutoResponse(text, userName),
        timestamp: nowTime(),
      }])
      setIsTyping(false)
    }, delay)
  }, [])

  const confirmAttachment = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== messageId || !m.attachment) return m
      return { ...m, attachment: { ...m.attachment, confirmed: true } }
    }))
    const t = nowTime()
    setDiaryEntries(e => [{
      id: uid(), t, kind: 'agent',
      text: 'Reboque de água confirmado — sábado 07:00.',
      meta: '2 000 L · Açude do Zé · R$ 40',
    }, ...e])
  }, [])

  const dismissAlert = useCallback((id: string) => {
    setDismissedAlerts(prev => prev.includes(id) ? prev : [...prev, id])
  }, [])

  const addDiaryEntry = useCallback((entry: Omit<DiaryEntry, 'id'>) => {
    setDiaryEntries(prev => [{ ...entry, id: uid() }, ...prev])
  }, [])

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...s }))
  }, [])

  const resetData = useCallback(() => {
    setDecisions(INITIAL_DECISIONS)
    setMessages(INITIAL_MESSAGES)
    setDiaryEntries(INITIAL_DIARY)
    setDismissedAlerts([])
    setSettings(DEFAULT_SETTINGS)
  }, [])

  return (
    <StoreContext.Provider value={{
      decisions, messages, diaryEntries, dismissedAlerts, settings,
      pendingCount, isTyping,
      approveDecision, rejectDecision, sendMessage, confirmAttachment,
      dismissAlert, addDiaryEntry, updateSettings, resetData,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
