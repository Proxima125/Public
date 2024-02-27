import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        loadb: {
          '0%': { opacity: '0.015' },
          '10%': { opacity: '0.015' },
          '30%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0.015' },
        },
        loada: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadein: {
          '0%': { opacity: '0' },
          '25%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        loadb: 'loadb 1.7s linear forwards',
        loada: 'loada 0.5s linear forwards',
        fadein: 'fadein 0.5s linear'
      },
    },
  },
  plugins: [],
}
export default config
