import { http } from "./api";

const endpointBase = 'api/reportes/';

export const getReportes = async (values) => {
    const url = endpointBase 
    return await http.get(url);
}

export const getReporteDinamico = async (idReporte,campos,valores,formatoAlternativo) => {
    const url = endpointBase + 'dinamic/' + idReporte;
    var data =  {"campos": campos , "valores": valores  , "formatoAlternativo": formatoAlternativo}
    return await http.post(url, data/*,{
        responseType: 'blob',}*/
    );
}

export const getConfig = async (nombreConfig) => {
    const url = endpointBase + 'configuraciones/'+nombreConfig
    return await http.get(url);
}

export const setConfig = async (nombreConfig,valor) => {
    const url = endpointBase + 'configuraciones/'+nombreConfig+'/set/'+valor
    return await http.put(url);
}
