import axios from "axios";

export const BASE_URL = 'http://localhost:8000';
// export const BASE_URL = 'http://13.21.34.200:8000';

const URL_UPLOAD = BASE_URL + "/api";

function downloadFile(fileName) {
  return axios({
    method: 'get',
    url: BASE_URL + '/media/translated/' + fileName,
    responseType: 'arraybuffer'
  })
}

function getFile() {
  return axios.get(URL_UPLOAD + '/files/');
}

export {
  downloadFile,
  getFile
}
