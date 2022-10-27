'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  // const [data] = JSON.parse(this.responseText)
  const languages = Object.values(data.languages);
  console.log(languages)
  const currencies = Object.keys(data.currencies);

  const html = `        
    <article class="country ${className}">
    <img class="country__img" src="${data.flags?.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name['common']}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Millions</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencies[0]}</p>
    </div>
  </article>`

  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1;
}


const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
  request.send();



  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    renderCountry(data)
    console.log(data);
    // get neighbor country 
    const neighbors = data.borders?.[0] 
    // we use guard clause to avoid the null result
    if(!neighbors) return;
    console.log(neighbors)

    const request2 = new XMLHttpRequest()
    // const [data] = JSON.parse(this.responseText)
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbors}`)
    request2.send();

    request2.addEventListener('load', function () {
      // const [data2] = await JSON.parse(this.responseText)
      const borderData = JSON.parse(this.responseText)
      console.log(borderData?.[0])
      renderCountry(borderData?.[0], 'neighbour')
    })

  })
}

// getCountryAndNeighbor('japan')
getCountryAndNeighbor('usa')