import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'transform',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'sm:-translate-y-2',
    'md:-translate-x-32',
    'md:-translate-y-4',
    'left-1/2',
    'top-1/2'
  ],
  theme: {
    extend: {

      fontFamily: {
        casino: ['"Casino"'],
        k: ['"Korean"'],
        ryujin: ['"Ryujin"'],
        inter: ['"Inter"', "sans-serif"],
        myriad: ['"Myriad"', "sans-serif"],
        myriadpro: ['"Myriad Pro"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config; 