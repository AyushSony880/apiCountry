
const countryContainer = document.querySelector(".country-container");
const Filter = document.querySelector(".filter")
const Search = document.querySelector('.search input')
let AllCountries;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  }).then((data)=>{
    renderCountries(data);
    AllCountries=data;
  });

  Filter.addEventListener('change',(e)=>{
    // console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=>res.json()).then(renderCountries)
  })

Search.addEventListener('input',(e)=>{
  const filterCountryName= AllCountries.filter((country)=>{
   return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  })
    renderCountries(filterCountryName);
})


function renderCountries(data) {
  countryContainer.innerHTML = " ";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = ` 
      <img class="country-flag" src=${country.flags.svg} alt="flag" srcset="" />
      <div class="country-info">
      <h3 class="card-title">${country.name.common}</h3>
      <p><b>Population :</b> <span>${country.population.toLocaleString(
        "en-IN"
      )}</span></p>
      <p><b>Region :</b> <span>${country.region}</span></p>
      <p><b>Capital :</b> <span>${country.capital}</span></p>
      </div> `;
    countryContainer.append(countryCard);
  });
}

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