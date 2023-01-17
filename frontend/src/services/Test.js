import axios from "axios";
import {BASE_URL} from "./UploadService";

function testCallAPI() {
  return fetch(BASE_URL + '/to/todos/').then(res => res.json());
}

function testCallAPI2() {
  return fetch(BASE_URL + '/api/test/').then(res => res.json());
}

export {
  testCallAPI,
  testCallAPI2
}