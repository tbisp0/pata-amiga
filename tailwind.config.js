/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salmon: {
          DEFAULT: '#FF7F66',
          hover: '#FF6B50',
          light: '#FFEBE7',
        },
        'baby-pink': {
          DEFAULT: '#FDE2E4',
          light: '#FFF0F2',
          border: '#F9D1D5',
        },
        'light-yellow': {
          DEFAULT: '#FFF1C5',
          dark: '#F5E19A',
        },
        'water-green': {
          DEFAULT: '#A8E6CF',
          hover: '#93DEC2',
          dark: '#2E7D62',
        },
        'neutral-bg': '#FDFDFD',
        'neutral-card': '#FFFFFF',
        'dark-text': '#2D3748',
        'subtle-text': '#718096',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(255, 127, 102, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'float': '0 10px 25px -3px rgba(46, 125, 98, 0.3)',
      }
    },
  },
  plugins: [],
}
