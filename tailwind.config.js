/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [daisyui],
}
