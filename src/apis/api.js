import axios from 'axios';
import { getToken } from "../utils/auth-helper";

const getInstance = () => {

    let params = { baseURL: process.env.REACT_APP_API_URL , 
	headers: {'Content-Type': 'application/json'}};
	const _httpInstancia = axios.create(params);
	
	_httpInstancia.interceptors.request.use(config => {
		const token = getToken();
		if (token) {
		  config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	  });
	
	  _httpInstancia.interceptors.response.use(
		response => response,
		error => {
		  if (error.response.status === 401) {
			window.location = "/";
		  } else {
			return Promise.reject(error);
		  }
		}
	  );

    return _httpInstancia;
}

const http = getInstance();

export {
    http
};