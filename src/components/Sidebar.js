import React, { useState, useEffect } from 'react';
import "../utils/App.css";
import {SidebarData} from './SidebarData';
import * as ReportesAPI from "../apis/ReportesAPI";
import { useAlert } from 'react-alert';
import { logoutUser,getToken,getUser } from "../utils/auth-helper";
import { Divider } from '@material-ui/core';

function Sidebar() {

  const alert = useAlert();
  const CONFIG_TURNOS = "TurnosActivo";
  const CONFIG_DIAGNOSTICOS = "DiagnosticosActivo";

  const [turnosActivo, setTurnosActivo] = useState(1)
  const [diagnosticosActivo, setDiagnosticosActivo] = useState(1)

  useEffect(() => {
      getConfig(CONFIG_TURNOS);
      getConfig(CONFIG_DIAGNOSTICOS);
      
  }, []);
  
  const setConfig = (nombreConfig,valorConfig) => {

    switch (nombreConfig) {
      case CONFIG_TURNOS:
        setTurnosActivo(valorConfig);
        break;
      case CONFIG_DIAGNOSTICOS:
        setDiagnosticosActivo(valorConfig);
        break;
    }
  }


  const getConfig = (nombreConfig) => {

    ReportesAPI.getConfig(nombreConfig)
    .then(response => {
      setConfig(nombreConfig,response.data.valor)
    })          
    .catch(function(error) {
      if (error.response == undefined)
        alert.show("" + error);
      else
        alert.show("" + error.response.data.error);
    });
  };

  const handleLogOut = () => {
    logoutUser();
  }

    return (
        <div className='Sidebar'>
            <header className='userName'  style={{ textAlign: "center"}}>
                <b>{getUser().Nombre} </b> - { getUser().Email}
            </header>
            <Divider />
            <ul className='SidebarList'>
                {SidebarData(diagnosticosActivo,turnosActivo).map((val, key)=> {
                    return (
                        <li style={{ marginLeft: "5%"}}
                            key={key} 
                            className='row'
                            id={window.location.pathname == val.link ? "active" : ""}
                            onClick={()=>{
                                if (val.title == "Cerrar Sesion") 
                                {
                                    handleLogOut()
                                };
                                window.location.pathname = val.link;
                            }}>
                            <div id="icon">{val.icon}</div> <div id='title'>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;