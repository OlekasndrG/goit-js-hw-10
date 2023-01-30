const ENDPOINT = 'https://restcountries.com/v2/name/';
import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  return fetch(
    `${ENDPOINT}${name}?fields=name,capital,languages,flags,population`
  ).then(response => {
    if (!response.ok) {
      throw new Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    }
    return response.json();
  });
}

// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=${name},capital,currencies
