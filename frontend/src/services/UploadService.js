import axios from "axios";

export const BASE_URL = 'http://localhost:8000';
// export const BASE_URL = 'http://13.21.34.200:8080/translation';

const URL_UPLOAD = BASE_URL + "/api";

function uploadFile(formData, sourceLang, desLang) {
  return fetch(URL_UPLOAD + '/upload?source=' + sourceLang + '&des=' + desLang,
    {
      method: 'POST',
      body: formData,
    })
}

function downloadFile(url) {
  return axios({
    method: 'get',
    url,
    responseType: 'arraybuffer'
  })
}

function getFile() {
  return axios.get(URL_UPLOAD + '/files/');
}

export {
  uploadFile,
  downloadFile,
  getFile
}
