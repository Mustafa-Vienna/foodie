import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'https://foodieback-0e50528a3736.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export default axios;