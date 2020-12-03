import { http } from "./api";

const endpointBase = 'api/auth/';

export const getUsuario = async (values) => {
    const url = `api/auth/signin/${values}`
    return await http.get(url);
}

export const loginUser = async (dni,password) => {
    const url = endpointBase + 'signin' //'api/auth/signin'
    var data =  {"dni": dni , "password": password }
    return await http.post(url, data);
}
