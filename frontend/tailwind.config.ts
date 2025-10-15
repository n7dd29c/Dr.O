import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // 이 부분이 src/app을 가리키고 있는지 확인
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;