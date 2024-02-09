import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const withOpacity = (variable: string) => {
  return `rgb(var(${variable}) / <alpha-value>)`;
};

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          // "50": "#f1f8f5",
          "50": "#E9EDE8",
          "100": "#deede5",
          "200": "#bfdbcd",
          "300": "#94c1ae",
          "400": "#66a18a",
          "500": "#46836e",
          "600": "#2e5e4e",
          DEFAULT: "#2e5e4e",
          "700": "#295346",
          "800": "#224339",
          "900": "#1d372f",
          "950": "#0f1f1b",
        },
        "primary-disabled": "#7f8e8a",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
} satisfies Config;
