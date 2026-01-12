import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        cream: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF3E8',
          300: '#F5E9D4',
        },
        coral: {
          400: '#FF7F6E',
          500: '#FF6B57',
          600: '#E55A47',
        },
        sage: {
          400: '#8FB39A',
          500: '#6B9B7A',
          600: '#5A8A69',
        },
        slate: {
          800: '#2D3748',
          900: '#1A202C',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 40px rgba(255, 107, 87, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
