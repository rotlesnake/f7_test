import axios from 'axios'
import store from '@/store'


const service = axios.create({
  baseURL: "http://lean.l2xl.ru/api/",
  timeout: 9000,
  headers: {
    'Content-Type': 'application/json',
  }
});

service.interceptors.request.use((request) => {

  if (store.state.app.isAuthorized) {
    request.headers.token = store.state.app.authorizedToken;
  }

  return request;
});



export default service;
