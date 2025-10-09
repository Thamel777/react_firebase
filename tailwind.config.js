/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#e0f2fe',
        },
        update: {
          DEFAULT: '#f59e0b',
          foreground: '#fef3c7',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#fee2e2',
        },
        navigate: {
          DEFAULT: '#14b8a6',
          foreground: '#ccfbf1',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'grid-slate':
          'linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

