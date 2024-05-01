import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {      
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'pacifico':['Pacifico', 'font-pacifico']
      },
    },
    colors: {
      'white': '#FFFFFF',
      'off-white': '#E7ECEF',
      'lightest-gray': '#BEC5D0',
      'light-gray': '#919AA9',
      'gray': '#2A4747',
      'green': '#7FB069',
      'blue': '#4C7DE7',
      'red': '#CA3C25',
      'black': "#1D1A05",
    },
  },
  plugins: [],
};
export default config;


