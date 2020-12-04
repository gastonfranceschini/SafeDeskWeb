import { http } from "./api";

const endpointBase = 'api/auth/';

export const loginUser = async (dni,password) => {
    const url = endpointBase + 'signin'
    var data =  {"dni": dni , "password": password }
    return await http.post(url, data);
}
