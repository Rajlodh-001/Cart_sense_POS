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
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        success: "var(--success-green)",
        danger: "var(--danger-red)",
        bgdarkgray: "#fafafa",
        "primary-white-dark": "#f7f7f7",
        "primary-white-light": "#ffffff",
        "primary-blue-dark": "#2d71f8",
        "primary-blue-light": "#f6faff",
        "primary-red-dark": "#fc4a4a",
        "primary-red-light": "#fff5f4",
        "primary-green-dark": "#1c8370",
        "primary-green-light": "#f1fffc",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

export default config;
