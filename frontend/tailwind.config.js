module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF',  // Dark Blue
        'secondary': '#9333EA',  // Purple
        'accent': '#FBBF24',  // Yellow
        'neutral': '#1F2937',  // Dark Grey
        'base-100': '#FFFFFF', // White for background
        'error': '#EF4444',  // Red for errors
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}
