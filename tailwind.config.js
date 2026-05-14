/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1B5C',
        navy2: '#0D2575',
        red: '#CC1111',
        red2: '#E01515',
        ink: '#09090F',
        off: '#F5F7FB',
        slate: '#4A5568',
        muted: '#8A96AC',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
