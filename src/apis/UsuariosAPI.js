import { http } from "./api";

const endpointBase = 'api/usuarios/';


export const getUsuariosDependientes = async (values) => {
    const url = endpointBase + 'dependientes'
    return await http.get(url);
}

export const getGerencias = async (values) => {
    const url = endpointBase + 'gerencias'
    return await http.get(url);
}

export const changePassword = async (dni,passOld,passNew) => {
    const url = endpointBase + 'password'
    var data =  {"dni": dni , "oldPassword": passOld  , "newPassword": passNew}
    return await http.put(url, data);
}
