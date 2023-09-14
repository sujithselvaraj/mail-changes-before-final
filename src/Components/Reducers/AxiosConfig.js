

import axios from 'axios';
import { keycloak } from '../../keycloak';
import jwtDecode from 'jwt-decode';

const keycloakToken = keycloak.token;

const decodedToken = jwtDecode(keycloakToken);

const email=decodedToken.email;
console.log("email"+email);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8443',
  
  headers:{
    common:
  {
    Authorization:`Bearer ${keycloak.token}`,
    username:email,
  }}
});


export default axiosInstance;
