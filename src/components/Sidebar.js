import React, { useState, useEffect } from 'react';
import "../utils/App.css";
import {SidebarData} from './SidebarData';
import * as ReportesAPI from "../apis/ReportesAPI";
import { useAlert } from 'react-alert';
import { logoutUser,getToken,getUser } from "../utils/auth-helper";

function Sidebar() {

  const alert = useAlert();
  const CONFIG_TURNOS = "TurnosActivo";
  const CONFIG_DIAGNOSTICOS = "DiagnosticosActivo";

  useEffect(() => {
      getConfig(CONFIG_TURNOS);
      getConfig(CONFIG_DIAGNOSTICOS);
  }, []);

  const getConfig = (nombreConfig) => {

    ReportesAPI.getConfig(nombreConfig)
    .then(response => {
      //alert.show("Test "+nombreConfig+ ":" +  response.data);
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
            <header className='userName'>
                {getUser().Nombre}
            </header>
            <ul className='SidebarList'>
                {SidebarData.map((val, key)=> {
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