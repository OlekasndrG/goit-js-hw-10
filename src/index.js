import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import API from './js/fetchCountries.js';

const inputEl = document.querySelector('input#search-box');
// const fullCOuntryList = document.querySelector('ul.country-list');
const country = document.querySelector('div.country-info');
let inputValue = '';
const DEBOUNCE_DELAY = 300;
// let inputValue = '';

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();

  inputValue = event.target.value.trim();
  API(inputValue)
    .then(answer => {
      if (answer.length === 1) {
        // return (country.innerHTML = createMarkupForOneCountry(answer));
        // console.log(createMarkupforOneCountry(answer));
        // return createMarkupforOneCountry({name, svg});
        return answer.reduce(
          (markup, country) => createMarkupForOneCountry(country) + markup,
          ''
        );
      } else if (answer.length >= 2 && answer.length < 10) {
        return answer.reduce(
          (markup, country) => createMarkupformanyCountries(country) + markup,
          ''
        );
      } else if (answer.length >= 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .then(updateCountryList)
    .catch(onError);
}
// console.log(API('peru'));
// API(inputValue);

function createMarkupformanyCountries({ name, flags }) {
  return `
    <div class="one__country-card">
      <img src=${flags.svg} class="one__country-img">
        <h2 class="one__country-name"> ${name}</h2>
      
    </div>
    `;
}

function createMarkupForOneCountry({
  name,
  flags,
  capital,
  languages,
  population,
}) {
  return `
    <div class="country-card">
     <div class="one__country-card">
      <img src=${flags.svg} class="one__country-img">
        <h2 class="one__country-name"> ${name}</h2>
      
    </div>
        <h3 class="country-capital">capital: ${capital}</h3>
       
         <p class="country-population">population: ${population} </p>
        <p class="country-languages">languages: ${languages.map(
          name => name.name
        )}</p>
       
    </div>
    `;
}

function updateCountryList(markup = '') {
  country.innerHTML = markup;
}

// function check(length) {
//   if (a.length === 1) {
//     return createMarkup();
//   } else if (a.length >= 2 && a.length < 10) {
//     return 4;
//   } else if (a.length >= 10) {
//     return alert('too many');
//   } else return alert('bad request');
// }

function onError(error) {
  // Notiflix.Notify.failure(error);
  updateCountryList('<p> Articles not found</p>');
}
