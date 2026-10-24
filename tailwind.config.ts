import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { cream: "#F7F0E4", ink: "#1A1310", maroon: "#6B1F1F", brick: "#A33A22", gold: "#C99A3E", sage: "#35503F" } } },
  plugins: []
};
export default config;
