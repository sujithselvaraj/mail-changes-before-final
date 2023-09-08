
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const axiosInstance = axios.create({
//   baseURL: 'https://localhost',
//   headers: {
//     common: {
//       'Authorization': `Bearer ${Cookies.get('token')}`
//     }
//   }
// });

// export default axiosInstance;

// import axios from 'axios';
// import Cookies from 'js-cookie';

// // Retrieve the token from the HttpOnly cookie
// const authToken = Cookies.get('token');

// const axiosInstance = axios.create({
//   baseURL: 'https://localhost',
//   // withCredentials: true, 
//   headers: {
//     common: {
//       'Authorization': `Bearer ${authToken}` // Include the token in the 'Authorization' header
//     }
//   }
// });

// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost',
  headers:{
  withCredentials: true
  }
});
axiosInstance.defaults.withCredentials=true;
export default axiosInstance;
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const axiosInstance = axios.create({
//   baseURL: 'https://localhost',
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

