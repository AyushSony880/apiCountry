const countryName = new URLSearchParams(location.search).get("name");
const backButton = document.querySelector(".back-Button");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const countryTextDetails = document.createElement("div");
    countryTextDetails.classList.add("country-textDetails");
    let nativeName = "",capital = "",currencies = "",language = "",subregion = "";
    if (data[0].name.nativeName) 
      nativeName = Object.values(data[0].name.nativeName)[0].common;
     else 
      nativeName = data[0].name.common;
    if (data[0].capital) 
      capital = data[0].capital.join(" , ");
    if (data[0].currencies) 
      currencies = Object.values(data[0].currencies)[0].name;
    if (data[0].languages) 
      language = Object.values(data[0].languages).join(", ");
    if (data[0].subregion) 
      subregion = data[0].subregion;
    if (data[0].borders) {
      data[0].borders.forEach((borderCountryCode) => {
        fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`)
          .then((res) => res.json())
          .then(([data]) => {
            const borderCountryTag= document.createElement('a')
            borderCountryTag.innerText=data.name.common
            borderCountryTag.href=`/country.html?name=${data.name.common}`;
            borderCountryName.append(borderCountryTag)
          });
      });
    }
    countryTextDetails.innerHTML = ` 
        <div class="country-flag">
            <img src="${data[0].flags.svg}" alt="" srcset="" />
        </div>
        <div class="text-container">
                <h1 class="country-name">${data[0].name.common}</h1>
                <div class="country-text">
                <p><b>Native name :</b> <span>${nativeName}</span></p>
                <p><b>Population :</b> <span>${data[0].population.toLocaleString("en-IN")}</span></p>
                <p><b>Region :</b> <span>${data[0].region}</span></p>
                <p><b>Sub Region :</b> <span>${subregion}</span></p>
                <p><b>Capital :</b> <span>${capital}</span></p>
                <p><b>Top Level Domain :</b> <span>${data[0].tld.join(" , ")}</span></p>
                <p><b>Currencies :</b> <span>${currencies}</span></p>
                <p><b>Language :</b> <span>${language}</span></p>
        </div>
        <div class="border-country">
            <p class="border-country-name"><b>Border Countries:</b>&nbsp;</p>
        </div>`;
    const countryDetails = document.querySelector(".country-Details");
    countryDetails.append(countryTextDetails);
    const borderCountryName = document.querySelector(".border-country-name");
    // console.log(borderCountryName);
  });

  const Body = document.querySelector('body')
const DarkBtn = document.querySelector('.darkBtn')
let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
const modeImg = document.querySelector('.fa-regular')
const DarkLight = document.querySelector('.Dark-Light')

themeSwitcher();

DarkBtn.addEventListener('click',()=>{
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode',(JSON.stringify(isDarkMode)));
    themeSwitcher();
})


function themeSwitcher()
{
    if (JSON.parse(localStorage.getItem('isDarkMode'))) {
        Body.classList.add('dark');
        modeImg.setAttribute('class','fa-regular fa-sun')
        DarkLight.innerHTML='Light mode'
    }else{
        Body.classList.remove('dark');
        modeImg.setAttribute('class','fa-regular fa-moon')
        DarkLight.innerHTML='Dark mode'
    }
}


backButton.addEventListener('click',()=>{
  history.back();
  console.log('kkkkk');
  setTimeout(()=>{

    location.reload();
    console.log('lllllll');
  },5000)
})