import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common.authorization = `Bearer ${window.localStorage.getItem('token')}`;

