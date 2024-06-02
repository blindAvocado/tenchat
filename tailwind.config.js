/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      bg: "#F5F8FF",
      accent: {
        base: "#6172F3",
        light: "#8098F9",
      },
      text: {
        light: "#E0EAFF",
        dark: "#09090B",
        primary: "#71717A",
      },
      input: {
        bg: "rgba(128, 152, 249, 0.1)",
        border: "rgba(128, 152, 249, 0.5)",
        placeholder: "rgba(45, 49, 166, 0.2)",
      },
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'Arial', 'sans-serif'],
      'inter': ['Inter', 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
};
