/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        jost: ['"Jost Medium"', 'sans-serif'],
      },
      colors: {
        accent: '#ffcccb',
      },
    },
  },
  plugins: [],
}
