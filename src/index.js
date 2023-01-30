import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import API from './js/fetchCountries.js';
const countryAPI = new API();
const inputEl = document.querySelector('input#search-box');
const country = document.querySelector('div.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  countryAPI.name = event.target.value.trim();
  // inputValue = event.target.value.trim();
  countryAPI
    .fetchCountries()
    .then(answer => {
      if (answer.length === 1) {
        return createMarkupForOneCountry(answer[0]);
        // return (country.innerHTML = createMarkupForOneCountry(answer));
        // console.log(createMarkupforOneCountry(answer));
        // return createMarkupforOneCountry({name, svg});
        // return answer.reduce(
        //   (markup, country) => createMarkupForOneCountry(country) + markup,
        //   ''
        // );
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
          country => country.name
        )}</p>
       
    </div>
    `;
}

function updateCountryList(markup = '') {
  country.innerHTML = markup;
}

function onError(error) {
  console.error(error);

  // Notiflix.Notify.failure('Oops, there is no country with that name');
  updateCountryList('<p> Articles not found</p>');
}
