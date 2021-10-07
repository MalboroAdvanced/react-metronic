export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      //  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers['Access-Control-Allow-Origin'] = '*';
       // config.headers['Access-Control-Allow-Methods'] = '*';
       // config.headers['Access-Control-Allow-Headers'] = '*';

        localStorage.setItem('Authorization', `${authToken}`);
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
