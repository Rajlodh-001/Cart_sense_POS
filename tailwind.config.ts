import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // --bg-btn-white: #1f1f1f
    // --primary-white-dark:#f7f7f7;
    // --primary-white-light:#ffffff;
    // --pripary-blue-dark:#2d71f8;
    // --pripary-blue-light:#f6faff;
    // --primary-red-dark:#fc4a4a;
    // --primary-red-light:#fff5f4;
    // --primary-green-dark:#1c8370;
    // --pripary-green-light:#f1fffc;

   
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",

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
} satisfies Config;
