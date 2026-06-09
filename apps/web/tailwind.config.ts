import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        },
        teal: {
          500: '#0f766e'
        },
        skysoft: {
          500: '#60a5fa'
        },
        ink: '#10231d',
        mist: '#f4f8f6'
      },
      boxShadow: {
        card: '0 12px 32px rgba(16, 35, 29, 0.08)'
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
