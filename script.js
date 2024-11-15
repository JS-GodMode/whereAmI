"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${[
          ...Object.values(data.languages),
        ]}</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
                </div>
                </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderErr = function (message) {
  countriesContainer.style.opacity = 1;

  countriesContainer.insertAdjacentText("beforeend", message);
};

/*
const getCountryAndNeighbors = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    //   console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    console.log(Object.values(data.currencies)[0].name);

    //render country 1
    renderCountry(data);

    //Get neighbor country
    const neighbors = data.borders;
    // console.log(neighbours);

    if (!neighbors) return;
    neighbors.forEach(nei => {
      const requestOthers = new XMLHttpRequest();
      requestOthers.open('GET', `https://restcountries.com/v3.1/alpha/${nei}`);
      requestOthers.send();

      requestOthers.addEventListener('load', function () {
        const [dataNew] = JSON.parse(this.responseText);
        console.log(dataNew);

        renderCountry(dataNew, 'neighbour');
      });
    });
  });
};

// getCountryAndNeighbors('India');
// getCountryAndNeighbors('Japan');
// getCountryAndNeighbors('Sri Lanka');
// getCountryAndNeighbors('Germany');
getCountryAndNeighbors('Lebanon');

*/

// const request = fetch('https://restcountries.com/v3.1/name/India');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

// const getJSON = function (url, errMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
//     return response.json();
//   });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) return;

      //neighbors
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        "Country not found"
      );
    })
    .then((data) => {
      console.log(data);
      renderCountry(data[0], "neighbour");
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥💥💥`);
      renderErr(`Something went wrong ${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       let neighbor = data[0].borders[0];
//       if (!neighbor) return;

//       //neighbors
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥💥💥`);
//       renderErr(`Something went wrong ${err.message}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       let neighbor = data[0].borders;
//       if (!neighbor) return;

//       //neighbors
//       neighbor.forEach(nei =>
//         fetch(`https://restcountries.com/v3.1/alpha/${nei}`)
//           .then(res => res.json())
//           .then(data => renderCountry(data[0]))
//       );
//     });
// };

/*
//Testing event loop
console.log('Test Start');
setTimeout(() => console.log('0sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved Promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');
*/

/**
 * 
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve('You Win 💰');
    else reject(new Error('You lost your money! 💩'));
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout

const wait = function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

wait(2)
.then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 sec'));
  
  Promise.resolve('You Win').then(x => console.log(x));
  Promise.reject('abc').catch(x => console.error(x));
  
  */

/**
   * 
   *
  const getPosition = function () {
    return new Promise((resolve, reject) => {
      //  navigator.geolocation.getCurrentPosition(
        //    position => resolve(position),
        //    err => reject(err)
        //  );
        
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    */

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=257857582295925359010x19673`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       console.log(res);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(`You are in ${data.city},${data.country}.`)
//       return getJSON(
//         `https://restcountries.com/v3.1/name/${data.country}`,
//         'something went wrong'
//       );
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//       console.log('loaded');
//     });
// };

// btn.addEventListener('click', whereAmI);
/**
 * 
*
//Async Await
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//  fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
const whereAmI = async () => {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    //reverse Geocoding
    const geo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=257857582295925359010x19673`
    );
    if (!geo.ok) throw new Error('Problem getting location data');
    //Country data
    const { country } = await geo.json();
    // console.log(country);
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    // console.log(res);
    renderCountry(data[0]);
    return `You are in ${country}`;
  } catch (error) {
    console.error(error);
    renderErr('Something Went Wrong');
    //Reject promise returned from async function
    throw new Error(`custom error handler ${error}`);
  }
};

// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(res => console.log(res))
//   .catch(err => console.error(err))
//   .finally(() => console.log(`third`));

(async function () {
  console.log('first');
  try {
    const res = await whereAmI();
    console.log(res);
  } catch (err) {
    console.error(`custom error ${err}`);
  }
  console.log('third');
})();
// try {
  //   let y = 1;
  //   const x = 2;
  //   x = 3;
  // } catch (err) {
    //   alert(err.message);
    // }
*/

const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const res1 = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     const res2 = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     const res3 = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     const resArr = [res1[0], res2[0], res3[0]];

//     resArr.forEach(async country => {
//       // const country = await res;
//       // template literal  converts array to string
//       console.log(`${country.capital}`);
//       console.log(
//         `The capital of ${country.name?.common} : ${country.capital}`
//       );
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

/**
 * 
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [res1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [res2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [res3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital[0]));
    // console.log([res1.capital[0], res2.capital[0], res3.capital[0]]);
  } catch (err) {
    console.log(err);
  }
};

get3Countries('India', 'Brazil', 'Australia');
*/

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/India`),
    getJSON(`https://restcountries.com/v3.1/name/Italy`),
    getJSON(`https://restcountries.com/v3.1/name/Mexico`),
  ]);

  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/Mexico`),
  timeout(3),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

//Promise.allSettled
Promise.allSettled([
  Promise.resolve("success"),
  Promise.resolve("success"),
  Promise.resolve("success"),
  Promise.reject("reject"),
]).then((res) => console.log(res));

//Promise.any

//Promise.allSettled
Promise.any([
  Promise.resolve("success"),
  Promise.resolve("success"),
  Promise.resolve("success"),
  Promise.reject("reject"),
]).then((res) => console.log(res));
