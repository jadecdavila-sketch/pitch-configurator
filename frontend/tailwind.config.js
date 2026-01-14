/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DA3C04',
          dark: '#DA3C04',
          medium: '#F26902',
          light: '#F8B50C',
        },
        secondary: {
          DEFAULT: '#127295',
          dark: '#003366',
          light: '#21A3B1',
        },
        neutral: {
          DEFAULT: '#2C2F30',
          charcoal: '#2C2F30',
          gray: '#8C8C8C',
          'light-gray': '#EAEAEA',
        },
      },
      fontFamily: {
        sans: ['Mont', 'Arial', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Mont', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
}
