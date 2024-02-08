let carouselelementsID 
let darkScreenshots = []
let themeElements = ["subMainContainer"]
let themevariant;
let isThemeDark=true;



function ThemeSwitch(){
        
    if(isThemeDark) {
      themevariant ="light"
      themeElements.forEach(element => {
      document.getElementById(element).style.backgroundColor = "#ffffff";
    });
    document.getElementById('carouselImage1').src = '/styles/image/screenshots/light/flight_white.png'
    document.getElementById('carouselImage3').src = '/styles/image/screenshots/light/log_white.png'
    document.getElementById('carouselImage4').src = '/styles/image/screenshots/light/packets_white.png'
    document.getElementById('carouselImage5').src = '/styles/image/screenshots/light/parameters_white.png'
    document.getElementById('carouselImage2').src = '/styles/image/screenshots/light/network_white.png'
    document.getElementById('mainpage').setAttribute('data-bs-theme', themevariant)
    //document.getElementsByName('html').setAttribute('scrollbar-color',"#ffffff")

        isThemeDark=false;
    }
    else {
        themevariant ="dark"
        themeElements.forEach(element =>{
          document.getElementById(element).style.backgroundColor = "#2b3035";
    });
    document.getElementById('carouselImage1').src = '/styles/image/screenshots/dark/fight.png'
    document.getElementById('carouselImage2').src = '/styles/image/screenshots/dark/hetwork.png'
    document.getElementById('carouselImage3').src = '/styles/image/screenshots/dark/log.png'
    document.getElementById('carouselImage4').src = '/styles/image/screenshots/dark/packets.png'
    document.getElementById('carouselImage5').src = '/styles/image/screenshots/dark/parameters.png'
    document.getElementById('mainpage').setAttribute('data-bs-theme', themevariant)
        isThemeDark=true;
    }
   
   
}