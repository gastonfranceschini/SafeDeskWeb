import axios from 'axios';

export const apiProvider = axios.create({
	baseURL: process.env.REACT_APP_API_URL, //'https://safedesk.apiexperta.com.ar',
	headers: {
			'Content-Type': 'application/json'
	}
})

const getInstance = () => {
    let params = { baseURL: process.env.REACT_APP_API_URL , 
	headers: {'Content-Type': 'application/json'}};
    const _httpInstancia = axios.create(params);
    return _httpInstancia;
}

const http = getInstance();

export {
    http
};