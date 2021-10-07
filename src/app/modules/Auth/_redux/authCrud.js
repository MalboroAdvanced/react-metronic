import axios from "axios";

//export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;
export const LOGIN_URL = `${process.env.REACT_APP_AUTH_API_URL}/oauth/token`;
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
//export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;
export const ME_URL = `${process.env.REACT_APP_AUTH_API_URL}/user/me`;

export function login(email, password) {
  const headers = {
    'Authorization': 'Basic ' + window.btoa('Client:chauhan'),
    'Content-type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'http://localhost:3005/',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
    }
    var vdata={'username':email,
  'password':password,
  'grant_type':"password"
  }
  /* var d=axios.post(LOGIN_URL+"?grant_type=password&username="+email+"&password="+password, vdata, { headers:headers });
  var dd;
  d.then(function(result) {
   
   dd= result.data;
 }, err => {
    alert('er '+err); 
 }); 
  //return axios.post(LOGIN_URL, { email, password });
  return [200, { ...dd, password: undefined }]; */
 
return axios.post(LOGIN_URL+"?grant_type=password&username="+email+"&password="+password, vdata, { headers:headers });

}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  
  return axios.get(ME_URL);
}
