import type { Config } from "tailwindcss";

import { theme } from "./src/styles/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...theme,
      },
      boxShadow: {
        "3xl": "-4px -1px 10px 4px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
