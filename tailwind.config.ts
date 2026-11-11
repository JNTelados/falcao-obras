import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* Superfície base: branco suavizado (evita o "branco de tela") */
        canvas: {
          DEFAULT: '#fbfbfc',
          soft: '#f7f8fa',
          deep: '#f2f4f7',
        },
        /* Base neutra: cinzas sofisticados */
        graphite: {
          50: '#f6f7f8',
          100: '#eceef1',
          200: '#d8dce2',
          300: '#b6bdc8',
          400: '#8b95a5',
          500: '#697485',
          600: '#525b6a',
          700: '#414855',
          800: '#2b3038',
          900: '#1b1e23',
          950: '#101216',
        },
        /* Detalhes em dourado */
        gold: {
          50: '#fdf9ec',
          100: '#f9efcb',
          200: '#f2dd93',
          300: '#e9c65a',
          400: '#dfae33',
          500: '#c9901c',
          600: '#a86f14',
          700: '#855114',
          800: '#6f4118',
          900: '#5e3619',
        },
        /* Amarelo de sinalização / gás */
        flame: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe484',
          300: '#ffd043',
          400: '#ffbb14',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        /* Vermelho técnico */
        ember: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda29b',
          400: '#f97066',
          500: '#e8443a',
          600: '#c92a20',
          700: '#a41f18',
        },
        /* Verde-água / hidráulica */
        aqua: {
          50: '#eefbfb',
          100: '#d3f4f4',
          200: '#a9e8ea',
          300: '#74d5da',
          400: '#3fb8c2',
          500: '#259aa6',
          600: '#1c7b8b',
          700: '#1a6472',
          800: '#1b515d',
          900: '#1a444f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 18, 22, 0.04), 0 8px 24px -12px rgba(16, 18, 22, 0.14)',
        card: '0 2px 4px rgba(16, 18, 22, 0.03), 0 18px 40px -24px rgba(16, 18, 22, 0.28)',
        lift: '0 4px 8px rgba(16, 18, 22, 0.05), 0 32px 60px -32px rgba(16, 18, 22, 0.42)',
        gold: '0 12px 32px -14px rgba(201, 144, 28, 0.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(16,18,22,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,18,22,0.045) 1px, transparent 1px)',
        'gold-line': 'linear-gradient(90deg, transparent, #dfae33, transparent)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
