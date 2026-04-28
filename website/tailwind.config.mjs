/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4F1E8',
          soft: '#FAF8F1',
          warm: '#EFEADC',
        },
        ink: {
          DEFAULT: '#0E0E0E',
          900: '#1A1A1A',
          800: '#2A2A2A',
          700: '#404040',
          600: '#5C5C5C',
          500: '#7A7A7A',
          400: '#9A9A9A',
          300: '#BFBBB1',
          200: '#D9D5C9',
          100: '#E8E4D8',
        },
        rule: '#D9D5C9',
        brand: {
          DEFAULT: '#8B0020',
          soft: '#A8002A',
          ink: '#5A0014',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fadeIn 1s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
