import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './screens/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4EEDF',
        paper: '#FAF6EC',
        sand: '#EAE0C9',
        ink: '#1F2A22',
        'ink-soft': '#566054',
        'ink-mute': '#8A8F82',
        green: '#2A4A36',
        'green-mid': '#3F6A4E',
        'green-soft': '#6E9079',
        'green-tint': '#DDE6D5',
        'green-bg': '#E9EFDF',
        terra: '#C16A3F',
        'terra-tint': '#F2DCCB',
        gold: '#D6A23A',
        'gold-tint': '#F4E2B0',
        rain: '#3E6B91',
        'rain-tint': '#D9E4EE',
        alert: '#B8472D',
        'alert-tint': '#F4D7CE',
      },
      fontFamily: {
        head: ['var(--font-head)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
