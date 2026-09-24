/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#07090e',
        'dark-bg': '#0b0f17',
        'dark-surface': '#111622',
        'dark-card': '#141b2d',
        'dark-border': '#1e2638',
        'light-bg': '#f8fafc',
        'light-surface': '#ffffff',
        'light-card': '#f1f5f9',
        'light-border': '#e2e8f0',
        cyan: {
          accent: '#00f5ff',
          glow: 'rgba(0, 245, 255, 0.25)',
        },
        violet: {
          accent: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        emerald: {
          accent: '#10b981',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 245, 255, 0.25)',
        'glow-violet': '0 0 25px rgba(139, 92, 246, 0.25)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
