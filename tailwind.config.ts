import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#121b2f",
        primary_dark: "#071026",
        secondary: "#e3e8f3",
        third: "#9bffa5",
        fourth: "#051f18",
        fifth: "#00dabb",
        background: "#3f465d",
        button: "#00f4fe",
        background_secondary: "#25304b",
      },
    },
  },
  plugins: [],
};
export default config;
