/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth :{
        container : "1440px",
      },
      fontFamily :{
        amazonFont : "amazon-ember",
        titleFont : "Roboto",
        bodyFont : "Poppins",
      },
      screens:{
        xs :"320px",
        sm :"375px",
        sml :"500px",
        md :"667px",
        mdl :"768px",
        lg :"960px",
        lgl :"1024px",
        xl :"1280px",
      },
      colors:{
        amazon_light : "rgb(35,47,62)",
        amazon_black : "rgb(19,25,33)",
        amazon_yellow : "#febd69",
        whiteText : "#ffffff",
        lightText : "#ccc",
        quantity_box : "#F0F2F2",
        footerBottom :"#131A22",
      },
      boxShadow : {
        testShadow : "0px 0px 32px 1px rgba(199,199,199,1)",
        amazonInput : " 0px 0px 3px 2px rgba(228 121 17 / 50%)",
      }
    },
  },
  plugins: [],
}