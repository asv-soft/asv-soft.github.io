const select =  document.getElementById('langDropdown');
const allLangArr = ["ru","en"]

let userAgent = navigator.userAgentData

addEventListener("load", (event) => {
 if( localStorage.getItem("lang")==null || localStorage.getItem("lang").value == undefined){
    changeURLLangByCountry();
} 
else{
    changeLanguage(localStorage.getItem("lang"));
}
    document.getElementById('fieldUserAgent').innerHTML = "Device: "+userAgent.brands[2].brand+" v "+userAgent.brands[2].version+" | " 
    $(function(){
        $('.carousel').carousel({
          interval: 2000
        });
    });
});

select.addEventListener('change',changeURLLang)

function changeURLLangByCountry(){
   
    const arrRUCountries = ["RU","BY","KZ","UZ"]
    let Alpha_2;
    $.ajax({
        url: "https://get.geojs.io/v1/ip/geo.js",
        dataType: "jsonp",
        jsonpCallback:"geoip",
        success: function(data) {
          console.log("Country: "+data.country);
          console.log("Country Code: "+data.country_code);
          Alpha_2 = data.country_code;
          if (arrRUCountries.includes(Alpha_2)){
            changeLanguage(Alpha_2.toLowerCase())
        }
        else{
               changeLanguage("en")
        }  
        },
        error: function(){
            changeLanguage("en")
        }
      });
    
}

function changeURLLang(){
   
    let lang = select.value;
    changeLanguage(lang);
}

function changeLanguage(country_code){
    
    /* hash = hash.substring(1);
    console.log(document.getElementsByClassName('explain-text')[0].textContent)
  
    if (!allLangArr.includes(hash)){
        location.href = window.location.pathname + "#en"
        hash =  location.href
        hash = hash.substring(1);
        location.reload();
    } */

    select.value = country_code;
    if(country_code == "en"){
        for(let key in langArrEN){
            document.getElementsByClassName(key)[0].textContent = langArrEN[key];
        }

    }
    if(country_code == "ru"){
        for(let key in langArrRU){
            document.getElementsByClassName(key)[0].textContent = langArrRU[key];
        }
    }
    localStorage.setItem("lang",country_code);
   }
  


