'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import AgentMark from '@/components/AgentMark'
import { WaveIcon, DropIcon, SunIcon, CloudIcon, SparkIcon } from '@/components/icons'
import { GoatIcon } from '@/components/icons'
import { Tab } from '@/components/TabBar'

interface FarmScreenProps {
  onNavigate?: (tab: Tab) => void
}

type SubTab = 'rebanho' | 'cultivos' | 'agua' | 'equipe'

const subTabs: { id: SubTab; label: string }[] = [
  { id: 'rebanho', label: 'Rebanho' },
  { id: 'cultivos', label: 'Cultivos' },
  { id: 'agua', label: 'Água' },
  { id: 'equipe', label: 'Equipe' },
]

type AnimalStatus = 'ok' | 'watch' | 'treat'

interface Animal {
  id: string
  name: string
  type: string
  age: string
  weight: string
  status: AnimalStatus
  note: string
}

const animals: Animal[] = [
  { id: '047', name: 'Florzinha', type: 'Cabra leiteira', age: '4 anos', weight: '38 kg', status: 'ok', note: 'pesou +0,3kg' },
  { id: '042', name: 'Pretinho', type: 'Bode reprodutor', age: '5 anos', weight: '61 kg', status: 'watch', note: 'comendo menos · 3 dias' },
  { id: '038', name: 'Mariquinha', type: 'Cabra leiteira', age: '3 anos', weight: '34 kg', status: 'ok', note: '1,8 L de leite/dia' },
  { id: '029', name: 'Cravinho', type: 'Bode jovem', age: '8 meses', weight: '22 kg', status: 'treat', note: 'tratando giárdia' },
  { id: '015', name: 'Margarida', type: 'Cabra leiteira', age: '6 anos', weight: '36 kg', status: 'watch', note: 'perdeu 0,4kg' },
  { id: '009', name: 'Bento', type: 'Bode jovem', age: '11 meses', weight: '29 kg', status: 'ok', note: 'crescendo bem' },
]

const statusConfig: Record<AnimalStatus, { dotBg: string; ring: string; noteColor: string }> = {
  ok: { dotBg: '#2A4A36', ring: '#2A4A36', noteColor: '#3F6A4E' },
  watch: { dotBg: '#D6A23A', ring: '#D6A23A', noteColor: '#A37300' },
  treat: { dotBg: '#C16A3F', ring: '#C16A3F', noteColor: '#C16A3F' },
}

interface ForecastDay {
  day: string
  temp: string
  mm: number
  icon: 'sun' | 'cloud' | 'rain'
  isToday?: boolean
}

const forecast: ForecastDay[] = [
  { day: 'HOJE', temp: '32°', mm: 0, icon: 'sun', isToday: true },
  { day: 'TER', temp: '34°', mm: 0, icon: 'sun' },
  { day: 'QUA', temp: '33°', mm: 0, icon: 'sun' },
  { day: 'QUI', temp: '31°', mm: 2, icon: 'cloud' },
  { day: 'SEX', temp: '30°', mm: 6, icon: 'rain' },
  { day: 'SÁB', temp: '32°', mm: 0, icon: 'sun' },
  { day: 'DOM', temp: '33°', mm: 0, icon: 'sun' },
]

function ForecastIcon({ type }: { type: ForecastDay['icon'] }) {
  if (type === 'sun') return <SunIcon size={18} stroke="#D6A23A" strokeWidth={1.8} />
  if (type === 'cloud') return <CloudIcon size={18} stroke="#566054" strokeWidth={1.8} />
  return <DropIcon size={18} stroke="#3E6B91" strokeWidth={1.8} />
}

function SubTabRebanho() {
  const { addDiaryEntry, dismissedAlerts, dismissAlert } = useStore()
  const [examScheduled, setExamScheduled] = useState(false)
  const alertDismissed = dismissedAlerts.includes('farm_exam_alert') || examScheduled

  function handleScheduleExam() {
    const t = new Date()
    const time = `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`
    addDiaryEntry({ t: time, kind: 'agent', text: 'Exame de fezes agendado para o rebanho. Veterinário confirmado para esta semana.' })
    setExamScheduled(true)
    dismissAlert('farm_exam_alert')
  }

  function handleDismiss() {
    dismissAlert('farm_exam_alert')
  }

  return (
    <div>
      {/* Agent note */}
      {!alertDismissed && (
        <div className="mx-4 mt-4 bg-paper card-shadow rounded-[9px] p-3.5 flex gap-3 items-start border-l-[3px] border-gold">
          <AgentMark size={28} tone="green" />
          <div className="flex-1">
            <div className="font-head text-[13.5px] font-semibold text-ink">
              3 cabras pesaram menos essa semana
            </div>
            <p className="text-[12.5px] font-sans text-ink-soft mt-1 leading-[1.4]">
              Pode ser estresse pelo calor ou início de parasita. Quer que eu agende exame de fezes?
            </p>
            <div className="flex gap-2 mt-2.5">
              <button
                className="h-[30px] px-3 bg-green text-cream text-[12px] font-head font-semibold rounded-[5px] cursor-pointer"
                onClick={handleScheduleExam}
              >
                Agendar exame
              </button>
              <button
                className="h-[30px] px-3 text-ink-soft text-[12px] font-head font-semibold rounded-[5px] border border-line-strong cursor-pointer"
                onClick={handleDismiss}
              >
                Mais tarde
              </button>
            </div>
          </div>
        </div>
      )}

      {examScheduled && (
        <div className="mx-4 mt-4 bg-green-bg rounded-[9px] p-3 flex items-center gap-2">
          <span className="text-[13px] font-sans text-green font-semibold">✓ Exame de fezes agendado</span>
        </div>
      )}

      {/* Count chips */}
      <div className="px-5 mt-3.5 flex gap-2">
        <div className="flex-1 rounded-[7px] p-2.5 bg-paper card-shadow">
          <div className="font-head text-[22px] font-semibold leading-none text-ink">47</div>
          <div className="text-[10.5px] font-sans text-ink-soft mt-1">cabeças</div>
        </div>
        <div className="flex-1 rounded-[7px] p-2.5" style={{ backgroundColor: '#E9EFDF' }}>
          <div className="font-head text-[22px] font-semibold leading-none text-green">43</div>
          <div className="text-[10.5px] font-sans text-ink-soft mt-1">saudáveis</div>
        </div>
        <div className="flex-1 rounded-[7px] p-2.5" style={{ backgroundColor: '#F4E2B0' }}>
          <div className="font-head text-[22px] font-semibold leading-none" style={{ color: '#A37300' }}>3</div>
          <div className="text-[10.5px] font-sans text-ink-soft mt-1">atenção</div>
        </div>
        <div className="flex-1 rounded-[7px] p-2.5" style={{ backgroundColor: '#F2DCCB' }}>
          <div className="font-head text-[22px] font-semibold leading-none text-terra">1</div>
          <div className="text-[10.5px] font-sans text-ink-soft mt-1">tratando</div>
        </div>
      </div>

      {/* Animal list */}
      <div className="px-4 mt-2 flex flex-col gap-2">
        {animals.map((animal) => {
          const sc = statusConfig[animal.status]
          return (
            <div key={animal.id} className="bg-paper card-shadow rounded-xl p-3 flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-[8px] flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: '#EAE0C9' }}
              >
                <GoatIcon size={24} stroke="#8A8F82" strokeWidth={1.6} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10.5px] text-ink-mute">#{animal.id}</span>
                  <span className="font-head text-[15px] font-semibold text-ink">{animal.name}</span>
                </div>
                <div className="text-[12px] font-sans text-ink-soft">
                  {animal.type} · {animal.age} · {animal.weight}
                </div>
                <div
                  className="text-[11.5px] font-sans font-medium mt-0.5"
                  style={{ color: sc.noteColor }}
                >
                  {animal.note}
                </div>
              </div>
              <div
                className="w-2.5 h-2.5 rounded-full ml-auto flex-shrink-0 ring-2 ring-offset-1"
                style={{
                  backgroundColor: sc.dotBg,
                  '--tw-ring-color': sc.ring,
                } as React.CSSProperties}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SubTabAgua() {
  return (
    <div>
      {/* Cisterna hero */}
      <div className="mx-4 mt-4 bg-green rounded-xl p-[18px] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(#D6A23A 1px, transparent 1.4px)',
            backgroundSize: '14px 14px',
          }}
        />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="font-sans text-[11.5px] uppercase tracking-wide" style={{ color: 'rgba(250,246,236,0.70)' }}>
              Cisterna principal
            </div>
            <div className="flex items-end gap-1 mt-1">
              <span className="font-head text-[44px] font-semibold text-cream tracking-tighter leading-none">68</span>
              <span className="font-head text-[18px] self-end mb-1" style={{ color: 'rgba(250,246,236,0.70)' }}>%</span>
            </div>
            <div className="font-mono text-[12px] text-gold-tint mt-1">11 200 L · ~14 dias de consumo</div>
          </div>

          <div
            className="w-[70px] h-[100px] rounded-[5px] relative overflow-hidden flex-shrink-0"
            style={{ border: '1px solid rgba(244,226,176,0.70)' }}
          >
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: '68%', background: 'linear-gradient(to top, #3E6B91, rgba(214,162,58,0.50))' }}
            />
            <div
              className="absolute left-0 right-0"
              style={{ top: '32%', borderTop: '1px dashed rgba(244,226,176,0.60)' }}
            />
          </div>
        </div>

        <div
          className="mt-3 rounded-[6px] px-2.5 py-2 flex gap-2 items-start"
          style={{ backgroundColor: 'rgba(214,162,58,0.18)' }}
        >
          <SparkIcon size={14} stroke="#D6A23A" fill="#D6A23A" strokeWidth={1.5} className="flex-shrink-0 mt-px" />
          <p className="text-[12.5px] font-sans text-cream leading-[1.4]">
            <strong>Mandacaru:</strong> sem chuva nos próximos 9 dias. Reduzi a rega da palma de 4× pra 3× na semana — economiza ~600 L.
          </p>
        </div>
      </div>

      {/* Secondary cards */}
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2.5">
        <div className="bg-paper card-shadow rounded-xl p-3.5">
          <div className="w-8 h-8 rounded-[5px] flex items-center justify-center" style={{ backgroundColor: '#D9E4EE' }}>
            <WaveIcon size={18} stroke="#3E6B91" strokeWidth={1.8} />
          </div>
          <div className="font-sans text-[11px] text-ink-mute uppercase tracking-wide mt-2">AÇUDE</div>
          <div className="font-head text-[22px] font-semibold text-ink mt-0.5">41%</div>
          <div className="text-[11px] font-sans text-ink-soft mt-0.5">baixou 8% no mês</div>
        </div>
        <div className="bg-paper card-shadow rounded-xl p-3.5">
          <div className="w-8 h-8 rounded-[5px] flex items-center justify-center" style={{ backgroundColor: '#F4E2B0' }}>
            <DropIcon size={18} stroke="#D6A23A" strokeWidth={1.8} />
          </div>
          <div className="font-sans text-[11px] text-ink-mute uppercase tracking-wide mt-2">POÇO</div>
          <div className="font-head text-[22px] font-semibold text-ink mt-0.5">Reserva</div>
          <div className="text-[11px] font-sans text-ink-soft mt-0.5">~3 200 L · só emergência</div>
        </div>
      </div>

      {/* Forecast */}
      <div className="mx-4 mt-4">
        <div className="font-head text-[14px] font-semibold text-ink mb-2">Próximos 7 dias</div>
        <div className="bg-paper card-shadow rounded-xl p-3">
          <div className="grid grid-cols-7 gap-1">
            {forecast.map((day) => (
              <div
                key={day.day}
                className={`flex flex-col items-center gap-1.5 py-2 rounded-[6px] ${day.isToday ? 'bg-green-bg' : ''}`}
              >
                <span className="font-mono text-[9.5px] text-ink-mute font-semibold tracking-wide">{day.day}</span>
                <ForecastIcon type={day.icon} />
                <span className="font-head text-[13px] font-semibold text-ink">{day.temp}</span>
                <span className={`font-mono text-[9.5px] font-semibold ${day.mm > 0 ? 'text-rain' : 'text-ink-mute'}`}>
                  {day.mm > 0 ? `${day.mm}mm` : '—'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-line text-[11.5px] font-sans text-ink-soft">
            Acumulado previsto: <strong className="text-ink">8 mm</strong> · histórico do período:{' '}
            <strong className="text-ink">34 mm</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubTabPlaceholder({ label }: { label: string }) {
  return (
    <div className="mx-4 mt-4 bg-paper card-shadow rounded-xl p-5 text-center text-ink-mute font-sans text-[14px]">
      {label} — Em breve
    </div>
  )
}

const titleMap: Record<SubTab, string> = {
  rebanho: 'Rebanho',
  cultivos: 'Cultivos',
  agua: 'Água & tempo',
  equipe: 'Equipe',
}

export default function FarmScreen({ onNavigate: _onNavigate }: FarmScreenProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('rebanho')

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="font-sans text-[12px] text-ink-mute uppercase tracking-wider font-medium">
          A FAZENDA
        </div>
        <h1 className="font-head text-[32px] font-semibold text-ink tracking-tight mt-0.5">
          {titleMap[activeSubTab]}
        </h1>
      </div>

      {/* Sub-tabs */}
      <div className="px-5 pt-2 pb-0 flex gap-4 border-b border-line">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id
          return (
            <button
              key={tab.id}
              className={`font-head text-[13.5px] font-semibold pb-2.5 -mb-px border-b-2 cursor-pointer ${
                isActive ? 'text-green border-green' : 'text-ink-mute border-transparent'
              }`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {activeSubTab === 'rebanho' && <SubTabRebanho />}
      {activeSubTab === 'agua' && <SubTabAgua />}
      {activeSubTab === 'cultivos' && <SubTabPlaceholder label="Cultivos" />}
      {activeSubTab === 'equipe' && <SubTabPlaceholder label="Equipe" />}
    </div>
  )
}
