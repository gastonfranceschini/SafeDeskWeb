import { http } from "./api";

const endpointBase = 'api/diagnosticos/';


export const getUserDiagnostico = async (values) => {
    const url = endpointBase + 'valido'
    return await http.get(url);
}

export const saveDiagnostico = async ( temp,  perdioGusto,  contacto,  estoyEmbarazada,
     cancer,  diabetes,  hepatica,  perdioOlfato,
     dolorGarganta,  dificultadRespiratoria) => {
    const url = endpointBase
    let data =  {"Temperatura": temp , "PerdioGusto": perdioGusto  , "ContactoCercano": contacto,
    "EstoyEmbarazada": estoyEmbarazada , "Cancer": cancer  , "Diabetes": diabetes,
    "Hepatica": hepatica , "PerdioOlfato": perdioOlfato  , "DolorGarganta": dolorGarganta, "DificultadRespiratoria" : dificultadRespiratoria}

    console.log(await http.post(url, data))

    return await http.post(url, data);
}
