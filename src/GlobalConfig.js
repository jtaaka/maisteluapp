import default_beer_img from './img/default_beer_img.png'

export const DATE_FORMAT = 'DD.MM.YYYY hh:mm';

export const BACKEND_URL = "http://localhost:8080/";

export function beerImageOnError(event) {
  event.target.src = default_beer_img;
}