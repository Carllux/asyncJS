'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  // const [data] = JSON.parse(this.responseText)
  const languages = Object.values(data.languages);

  // console.log(languages)
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
  // countriesContainer.style.opacity = 1;
}

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentHTML('beforeend', msg);
//   // countriesContainer.style.opacity = 1;
// }


// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest()
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send();



//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText)
//     renderCountry(data)
//     console.log(data);
//     // get neighbor country 
//     const neighbors = data.borders?.[0] 
//     // we use guard clause to avoid the null result
//     if(!neighbors) return;
//     console.log(neighbors)

//     const request2 = new XMLHttpRequest()
//     // const [data] = JSON.parse(this.responseText)
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbors}`)
//     request2.send();

//     request2.addEventListener('load', function () {
//       // const [data2] = await JSON.parse(this.responseText)
//       const borderData = JSON.parse(this.responseText)
//       console.log(borderData?.[0])
//       renderCountry(borderData?.[0], 'neighbour')
//     })

//   })
// }

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`)

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(function(response) {
//     console.log(response);
//     return response.json();
//   }).then(function(data) { console.log(data[0])});
// }



// const getCountryData = async function (country) {
//   const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .catch(err => renderError(`Something went wrong ${err}`))
//     .finally(countriesContainer.style.opacity = 1)
//     // console.log(response.ok)

//     if (!response.ok) throw new Error('Country not found: ')

//   return response.json()
//     .then((data) => {
//       renderCountry(data[0])
//       const neighbour = (data[0]?.borders[0])
//       if (!neighbour) return;

//       // Country 2 returned 
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(data => data.json())
//     .then(nCountry => renderCountry(nCountry[0], 'neighbour'))


// }
// .then((data) => console.log((data[0]?.borders[0])));


// getCountryData('brazil')

// btn.addEventListener('click', function (e) {
//   e.preventDefault()
//   getCountryData('japan')
//   // getCountryData('asd')

// })

// getCountryData('shdjasdja')

// getCountryAndNeighbor('japan')
// getCountryAndNeighbor('usa')

// console.log('Test Start');;
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res))

// Promise.resolve('Resolved Promise 2').then(res => { 
//   for(let i= 9; i<1000000000; i++) {  }
//   console.log(res)});

// console.log('test End');

// const lotteryPromises = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening, please wait...');
//   setTimeout(() => {

//     if (Math.random() >= 0.5) {
//       resolve(' You win 👍');
//     } else {
//       reject(new Error('You lost your money'))
//     }

//   }, 2000)


// })

// lotteryPromises.then(res => console.log(res)).catch(err => console.error(err))

// // promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise((resolve, _reject) => {
//     setTimeout(resolve, seconds * 1000)
//   })
// }

// wait(2)
//   .then(() => {
//     console.log(`I waited for 2 seconds`)
//     return wait(1)
//   })
//   .then(() => console.log('I waited for another second'))

//   // we use it to skip callback hell

//   Promise.resolve('abc').then(x => console.log(x))

// navigator.geolocation.getCurrentPosition = (
//   position => console.log(position),
//   err => console.log(err)
// )
// console.log('Getting position')

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition = (
    // position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);

  });
};

// getPosition().then(pos => console.log(pos))

const whereAmI = function () {
  getPosition().then(pos => {
    const {latitude, longitude} = pos.coords;
    const lat = latitude, lng = longitude;
    console.log( lat, lng)
    // console.log(pos.coords)
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  })


    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();

    })

    .then(data => {
      console.log(data);
      console.log(`You're in ${data.city} ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })

    .then(res => {
      if(!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json()
    })

    .then(data => renderCountry(data[0]))
    .catch(err => console.error(err));
}

btn.addEventListener('click', whereAmI)