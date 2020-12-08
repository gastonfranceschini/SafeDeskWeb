import { http } from "./api";

const endpointBase = 'api/turnos/';

export const getTurnos = async (values) => {
    const url = endpointBase + 'misturnos'
    return await http.get(url);
}

export const getTurno = async (idTurno) => {
    const url = endpointBase + idTurno
    return await http.get(url);
}


export const getEdificios = async (fecha) => {
    const url = endpointBase + 'edificios/fecha/'+fecha
    return await http.get(url);
}

export const getHoras = async (idEdificio,fecha) => {
    const url = endpointBase + 'edificio/'+idEdificio+'/fecha/'+fecha+'/HorariosDeEntrada'
    return await http.get(url);
}

export const getPisos = async (idEdificio,fecha) => {
    const url = endpointBase + 'pisos/fecha/'+fecha+'/edificio/'+idEdificio
    return await http.get(url);
}

export const getTurnosHistoricos = async (values) => {
    const url = endpointBase + 'misturnoshistorico'
    return await http.get(url);
}

export const saveTurno = async (idUsuario, FechaTurno, IdPiso, IdEdificio, idHorarioEntrada) => {
    const url = endpointBase
    var data =  {"idUsuario": idUsuario , "fechaTurno": FechaTurno  , "idHorarioEntrada": idHorarioEntrada,
                "IdPiso" : IdPiso , "IdEdificio" : IdEdificio}

    return await http.post(url,data);
}