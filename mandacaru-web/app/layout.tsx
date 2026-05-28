import type { Metadata } from 'next'
import { Sora, Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-head',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
})
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mandacaru',
  description: 'Agente de IA para gestão da sua fazenda',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} bg-[#E8E0D0] font-sans min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
