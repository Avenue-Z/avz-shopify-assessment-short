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
        "brand-yellow": "#FFFC60",
        "brand-green": "#60FF80",
        "brand-cyan": "#60FDFF",
        "brand-blue": "#39A0FF",
        "brand-purple": "#6034FF",
        "bg-surface": "#272727",
        "bg-subtle": "#1a1a1a",
        "text-muted": "#8A8A8A",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
