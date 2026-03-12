import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: "#C75B39", light: "#D4795E", dark: "#A84A2D" },
        teal: { DEFAULT: "#2A9D8F", light: "#3DB8A9", dark: "#1F7A6F" },
        mustard: { DEFAULT: "#E9C46A", light: "#F0D48A", dark: "#D4AD4A" },
        cream: { DEFAULT: "#FEFAE0", dark: "#F5F0C8" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
