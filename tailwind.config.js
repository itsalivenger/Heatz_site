/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '0': '0',
        '110': '1.1',
      },
      transitionProperty: {
        'width': 'width',
      },
      spacing: {
        '0.5': '0.125rem',
      },
      colors: {
        'indigo-600': '#4f46e5',
        'input-color': 'rgba(15, 12, 41, 0.4)', // 20% opacity
        'bg-1':'#0f0c29',
        'bg-2':'#302b63',
        'bg-3':'#24243e',
        'light-bg1':'#e6dada',
        'light-bg2':'#274046',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover', 'focus'],
      width: ['hover', 'focus'],
    },
  },
  darkMode: 'selector',
  plugins: [],
}