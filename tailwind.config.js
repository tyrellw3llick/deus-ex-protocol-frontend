/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        'primary-dark': '#6D28D9',
        'primary-light': '#8B5CF6',

        background: {
          DEFAULT: '#000000', // Main background
          elevated: '#111827', // Slightly elevated elements
        },

        text: {
          primary: '#FFFFFF', // Primary text
          secondary: '#9CA3AF', // Secondary text
          tertiary: '#6B7280', // Less important text
        },

        border: {
          DEFAULT: '#374151', // Default border color
          light: '#4B5563', // Lighter borders
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        fontWeight: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
        },
      },
    },
  },
  plugins: [],
};
