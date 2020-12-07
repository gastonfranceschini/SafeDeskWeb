import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../utils/Sidebar.css';
import { IconContext } from 'react-icons';
import * as ReportesAPI from "../apis/ReportesAPI";
import { useAlert } from 'react-alert';
import { logoutUser,getToken,getUser } from "../utils/auth-helper";
import { Divider } from '@material-ui/core';

function Navbar() {

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


  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}>
              <b>{getUser().Nombre} - { getUser().Email}</b>
            </FaIcons.FaBars>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData(diagnosticosActivo,turnosActivo).map((item, index)=> {
              return (
                <li key={index} className={item.cName} onClick={()=>{
                  if (item.title == "Cerrar Sesion") 
                  {
                      handleLogOut()
                  };
                  window.location.pathname = item.path;
              }}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;