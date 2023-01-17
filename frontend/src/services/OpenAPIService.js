import {BASE_URL} from "./UploadService";

const URL_OPEN = BASE_URL + '/open';

function getCountry() {
  return fetch(URL_OPEN + '/getCountry').then(res => res.json());
}

export {
  getCountry
}
