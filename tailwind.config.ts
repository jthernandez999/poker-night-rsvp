import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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