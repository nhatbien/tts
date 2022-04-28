module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      backgroundImage: {
      'hero-pattern': "url('/public/images/ai.jpg')",
      'footer-texture': "url('/img/footer-texture.png')",
    }},
  },
  plugins: [],
}