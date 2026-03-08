/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        jost: ['"Jost Medium"', 'sans-serif'],
        generalsans: ['General Sans', 'sans-serif'],
      },
      colors: {
        accent: '#ffcccb',
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A2E',
        },
        white: {
          DEFAULT: '#FFFFFF',
          500: '#62646C',
          600: '#AFB0B6',
          800: '#E4E4E6',
        },
      },
    },
  },
  plugins: [],
}
