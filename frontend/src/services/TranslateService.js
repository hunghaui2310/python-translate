import axios from "axios";
import {BASE_URL} from "./UploadService";

function testCallAPI() {
  return fetch(BASE_URL + '/to/todos/').then(res => res.json());
}

function translate(fileName, source, target) {
  return axios.get(BASE_URL + `/translate/${fileName}/${source}/${target}`);
}

export {
  testCallAPI,
  translate
}