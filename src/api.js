import axios from 'axios';

    //"https://safedesk.apiexperta.com.ar";
    //"http://35.190.67.223";
    //"http://10.0.2.2:3000/api/reportes/test";

export const api = axios.create({
	baseURL: 'https://safedesk.apiexperta.com.ar',
	headers: {
			'Content-Type': 'application/json'
	},
})

export const getUsuario = async (values) => {
    const url = `api/auth/signin/${values}`
    return await api.get(url);
}