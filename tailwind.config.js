/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "torch": {
          50: "#fff1f3",
          100: "#ffdfe4",
          200: "#ffc5ce",
          300: "#ff9dac",
          400: "#ff647b",
          500: "#ff2445",
          600: "#ed1536",
          700: "#c80d29",
          800: "#a50f26",
          900: "#881425",
          950: "#4b040f"
        }
      },
      fontFamily: {
        "jakarta-light": ["PlusJakartaSans_300Light"],
        "jakarta-regular": ["PlusJakartaSans_400Regular"],
        "jakarta-medium": ["PlusJakartaSans_500Medium"],
        "jakarta-semibold": ["PlusJakartaSans_600SemiBold"],
        "jakarta-bold": ["PlusJakartaSans_700Bold"]
      }
    },
  },
  plugins: [],
}

