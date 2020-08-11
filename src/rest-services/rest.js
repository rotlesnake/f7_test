import api from '@/rest-services/api'

export default {
  get(url) {
    return api.get(url);
  },
  post(url,payload) {
    return api.post(url, payload);
  },
  put(url,payload) {
    return api.put(url, payload);
  },
  delete(url,msgId) {
    return api.delete(`${url}/${msgId}`);
  }

//api.head(...
//api.options(...
//api.patch(...
//
//axios.get('/user/12345').then(response => response.data)
//  .then(function (response) {
//    console.log(response.data);
//    console.log(response.status);
//    console.log(response.statusText);
//    console.log(response.headers);
//    console.log(response.config);
//  })
//    .catch(function (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       };
//     });
}