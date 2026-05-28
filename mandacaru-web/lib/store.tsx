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

export type AnimalStatus = 'ok' | 'watch' | 'treat'

export interface Animal {
  id: string
  name: string
  type: string
  status: AnimalStatus
  note: string
}

export interface FarmConfig {
  // Cisterna — configurado pelo usuário, atualizado por sensor (futuro)
  cisternaCapacidade: number    // litros totais da cisterna
  cisternaAtual: number         // nível atual em % (0-100)

  // Rebanho — configurado pelo usuário
  rebanhoTotal: number
  rebanhoSaudaveis: number
  rebanhoAtencao: number
  rebanhoTratando: number

  // Palma forrageira — configurado pelo usuário
  palmaArea: number             // hectares
  palmaDiasColheita: number     // estimativa de dias até colheita
  palmaStatus: 'Boa' | 'Regular' | 'Ruim'
}

// ─── Context interface ────────────────────────────────────────────────────────

interface StoreContextValue {
  decisions: Decision[]
  messages: Message[]
  diaryEntries: DiaryEntry[]
  dismissedAlerts: string[]
  settings: AppSettings
  farmConfig: FarmConfig
  animals: Animal[]
  hasOnboarded: boolean
  ready: boolean
  pendingCount: number
  isTyping: boolean
  approveDecision: (id: string) => void
  rejectDecision: (id: string) => void
  sendMessage: (text: string) => void
  confirmAttachment: (messageId: string) => void
  dismissAlert: (id: string) => void
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void
  updateSettings: (s: Partial<AppSettings>) => void
  updateFarmConfig: (config: Partial<FarmConfig>) => void
  addAnimal: (animal: Omit<Animal, 'id'>) => void
  removeAnimal: (id: string) => void
  completeOnboarding: (farmName: string, userName: string) => void
  resetData: () => void
}

// ─── Default / initial data ───────────────────────────────────────────────────

const DEFAULT_SETTINGS: AppSettings = {
  farmName: '',
  userName: '',
}

const DEFAULT_FARM_CONFIG: FarmConfig = {
  cisternaCapacidade: 0,
  cisternaAtual: 0,
  rebanhoTotal: 0,
  rebanhoSaudaveis: 0,
  rebanhoAtencao: 0,
  rebanhoTratando: 0,
  palmaArea: 0,
  palmaDiasColheita: 0,
  palmaStatus: 'Boa',
}

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
    title: 'Vacinar cabras contra raiva',
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
    text: 'Vinha lhe avisar: a cisterna baixou. Sem chuva prevista nos próximos 9 dias.',
    timestamp: '14:31',
  },
  {
    id: 'm2', role: 'agent',
    text: 'Quer que eu mande buscar mais água no açude do vizinho?',
    timestamp: '14:31',
  },
  {
    id: 'm3', role: 'user', text: '0:08', isVoice: true, duration: '0:08',
    timestamp: '14:32',
  },
  {
    id: 'm4', role: 'agent',
    text: 'Entendido. Marquei pra sábado de manhã. Já reservei 2 mil litros — R$ 40.',
    timestamp: '14:32',
    attachment: {
      title: 'Reboque de água — sábado 07:00',
      subtitle: '2 000 L · R$ 40',
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
  { id: 'e1', t: '14:31', tag: 'AGORA', kind: 'agent', text: 'Você pediu reboque de água. Reservei pra sábado 07:00.', meta: '2 000 L · R$ 40' },
  { id: 'e2', t: '13:48', kind: 'sense', text: 'Conferi previsão do INMET. 8 mm acumulado em 7 dias. Abaixei a meta de rega da palma.' },
  { id: 'e3', t: '11:02', kind: 'agent', text: 'Pedi orçamento de palma forrageira pra 3 fornecedores.', meta: 'Damião R$ 96 · Outros R$ 112, 120' },
  { id: 'e4', t: '10:14', kind: 'wait', text: 'Aguardando você aprovar: vacinação das cabras contra raiva.' },
  { id: 'e5', t: '09:32', kind: 'sense', text: 'Sensor da cisterna: nível baixo. Estimativa crítica sem chuva.' },
  { id: 'e6', t: '07:14', kind: 'agent', text: 'Mandei checar a cerca norte. Solto 2 estacas — vou avisar.' },
  { id: 'div1', t: 'ONTEM', tag: 'SEG 27/05', kind: 'div' },
  { id: 'e7', t: '18:22', kind: 'agent', text: 'Lancei a venda de 6 L de leite no caderno: Dona Lúcia · R$ 24.' },
  { id: 'e8', t: '16:05', kind: 'sense', text: 'Um animal comeu menos no cocho. Marcado pra observar.' },
  { id: 'e9', t: '08:00', kind: 'agent', text: 'Soltei o rebanho no piquete leste. Pasto reservado por 4 dias.' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const nowTime = () => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

let _uid = Date.now()
const uid = () => String(++_uid)

function fmtLitros(n: number): string {
  return n.toLocaleString('pt-BR')
}

function getAutoResponse(text: string, userName: string, cfg: FarmConfig): string {
  const firstName = userName.replace(/^seu\s+/i, '').split(' ')[0] || userName

  const litros = Math.round(cfg.cisternaCapacidade * cfg.cisternaAtual / 100)
  const diasCisterna = Math.round(litros / 800)

  const presets: Record<string, string> = {
    'Vai chover essa semana?': 'A previsão do INMET mostra só 8 mm nos próximos 7 dias — muito abaixo do normal. Vou manter o monitoramento da cisterna e da palma.',
    'Como tá a cisterna?': `A cisterna tá em ${cfg.cisternaAtual}%, cerca de ${fmtLitros(litros)} litros. Com o consumo atual, dura uns ${diasCisterna} dias.`,
    'Comprar ração': `Pode me dizer quanto de ração e qual tipo, ${firstName}? Verifico os preços com os fornecedores e trago as opções pra você aprovar.`,
  }
  if (presets[text]) return presets[text]

  const responses: [RegExp, string][] = [
    [/chuva|tempo|clima|previsão|previsao/i,
      'Tô de olho na previsão. Próximos 7 dias com pouca chuva — máximo 8 mm acumulado. Vou avisar se mudar.'],
    [/cisterna|água|agua/i,
      `A cisterna tá em ${cfg.cisternaAtual}%, uns ${fmtLitros(litros)} L. Dura aproximadamente ${diasCisterna} dias.`],
    [/cabra|rebanho|animal|gado|bode/i,
      `O rebanho tem ${cfg.rebanhoTotal} cabeças. ${cfg.rebanhoSaudaveis} saudáveis${cfg.rebanhoAtencao > 0 ? `, ${cfg.rebanhoAtencao} em atenção` : ''}${cfg.rebanhoTratando > 0 ? ` e ${cfg.rebanhoTratando} em tratamento` : ''}.`],
    [/palma|planta|cultivo|roça/i,
      `A palma tá ${cfg.palmaStatus.toLowerCase()} nas ${cfg.palmaArea} ha. Colheita estimada em ${cfg.palmaDiasColheita} dias.`],
    [/ração|racao|compra|preço|preco/i,
      'Vou verificar os preços com os fornecedores habituais e trago as melhores opções em breve.'],
    [/vacin|saúde|doença|doenca/i,
      'A vacinação das cabras contra raiva vence em 6 dias. Tô aguardando a sua aprovação pra agendar com a Dra. Cida no sábado.'],
    [/leite/i,
      'A produção de leite tá em dia. Posso registrar a venda se quiser — é só me dizer a quantidade e o comprador.'],
    [/olá|oi|bom dia|boa tarde|boa noite|tudo bem/i,
      `Oi, ${firstName}! Tudo certo por aqui. A fazenda tá em dia. Tem alguma coisa que precisa resolver?`],
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
  farmConfig: FarmConfig
  animals: Animal[]
  hasOnboarded: boolean
}

function loadFromStorage(): Persisted {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) {
      const parsed = JSON.parse(raw) as Persisted
      if (parsed.hasOnboarded === undefined) parsed.hasOnboarded = true
      if (!parsed.farmConfig) parsed.farmConfig = DEFAULT_FARM_CONFIG
      if (!parsed.animals) parsed.animals = []
      return parsed
    }
  } catch {}
  return {
    decisions: INITIAL_DECISIONS,
    messages: INITIAL_MESSAGES,
    diaryEntries: INITIAL_DIARY,
    dismissedAlerts: [],
    settings: DEFAULT_SETTINGS,
    farmConfig: DEFAULT_FARM_CONFIG,
    animals: [],
    hasOnboarded: false,
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
  const [farmConfig, setFarmConfig] = useState<FarmConfig>(DEFAULT_FARM_CONFIG)
  const [animals, setAnimals] = useState<Animal[]>([])
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const settingsRef = useRef(settings)
  const farmConfigRef = useRef(farmConfig)
  useEffect(() => { settingsRef.current = settings }, [settings])
  useEffect(() => { farmConfigRef.current = farmConfig }, [farmConfig])

  useEffect(() => {
    const s = loadFromStorage()
    setDecisions(s.decisions)
    setMessages(s.messages)
    setDiaryEntries(s.diaryEntries)
    setDismissedAlerts(s.dismissedAlerts)
    setSettings(s.settings)
    setFarmConfig(s.farmConfig)
    setAnimals(s.animals ?? [])
    setHasOnboarded(s.hasOnboarded ?? false)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        decisions, messages, diaryEntries, dismissedAlerts, settings, farmConfig, animals, hasOnboarded,
      }))
    } catch {}
  }, [ready, decisions, messages, diaryEntries, dismissedAlerts, settings, farmConfig, animals, hasOnboarded])

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
    const cfg = farmConfigRef.current
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: uid(), role: 'agent',
        text: getAutoResponse(text, userName, cfg),
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
      meta: '2 000 L · R$ 40',
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

  const updateFarmConfig = useCallback((config: Partial<FarmConfig>) => {
    setFarmConfig(prev => ({ ...prev, ...config }))
  }, [])

  const addAnimal = useCallback((animal: Omit<Animal, 'id'>) => {
    setAnimals(prev => [...prev, { ...animal, id: uid() }])
  }, [])

  const removeAnimal = useCallback((id: string) => {
    setAnimals(prev => prev.filter(a => a.id !== id))
  }, [])

  const completeOnboarding = useCallback((farmName: string, userName: string) => {
    setSettings({ farmName, userName })
    setHasOnboarded(true)
  }, [])

  const resetData = useCallback(() => {
    setDecisions(INITIAL_DECISIONS)
    setMessages(INITIAL_MESSAGES)
    setDiaryEntries(INITIAL_DIARY)
    setDismissedAlerts([])
    setSettings(DEFAULT_SETTINGS)
    setFarmConfig(DEFAULT_FARM_CONFIG)
    setAnimals([])
    setHasOnboarded(false)
  }, [])

  return (
    <StoreContext.Provider value={{
      decisions, messages, diaryEntries, dismissedAlerts, settings, farmConfig, animals,
      hasOnboarded, ready, pendingCount, isTyping,
      approveDecision, rejectDecision, sendMessage, confirmAttachment,
      dismissAlert, addDiaryEntry, updateSettings, updateFarmConfig,
      addAnimal, removeAnimal, completeOnboarding, resetData,
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
