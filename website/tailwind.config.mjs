/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAFAF7',
          soft: '#FFFFFF',
          warm: '#F2F1ED',
        },
        ink: {
          DEFAULT: '#111111',
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
        rule: '#E2DED4',
        brand: {
          DEFAULT: '#A8002A',
          soft: '#C72547',
          ink: '#7A001E',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fadeIn 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
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
