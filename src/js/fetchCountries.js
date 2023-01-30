const ENDPOINT = 'https://restcountries.com/v2/name/';
import Notiflix from 'notiflix';

export default class CountriesApi {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    return fetch(
      `${ENDPOINT}${this.name}?fields=name,capital,languages,flags,population`
    ).then(response => {
      if (!response.ok) {
        throw new Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      }
      return response.json();
    });
  }
}
