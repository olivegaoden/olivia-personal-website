/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body:  ['"Nunito"', 'sans-serif'],
        mono:  ['"VT323"', 'monospace'],
      },
      colors: {
        pink:     { DEFAULT: '#f7a8c4', light: '#fdd5e5', dark: '#e879a0' },
        lav:      { DEFAULT: '#b8aee8', dark: '#7c6bc0', mid: '#9b8dd4' },
        sky:      { DEFAULT: '#c5d8f0', light: '#d4eaf7' },
        cream:    '#fef6ff',
        ink:      { DEFAULT: '#3a3550', mid: '#6b6488', light: '#9b94c0' },
      },
      boxShadow: {
        pixel:        '4px 4px 0px #7c6bc0',
        'pixel-pink': '4px 4px 0px #e879a0',
        'pixel-sm':   '2px 2px 0px #7c6bc0',
        'win':        '0 0 0 3px #b8aee8, 4px 4px 0px #7c6bc0',
        'win-active': '0 0 0 3px #9b8dd4, 6px 6px 0px #7c6bc0',
      },
    },
  },
  plugins: [],
}
