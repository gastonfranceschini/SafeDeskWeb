import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from 'react';
import * as ReportesAPI from "../apis/ReportesAPI";
import { useAlert } from 'react-alert';
import { logoutUser,getToken } from "../utils/auth-helper";


const Header = () => {

  const alert = useAlert();
  const CONFIG_TURNOS = "TurnosActivo";
  const CONFIG_DIAGNOSTICOS = "DiagnosticosActivo";
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    console.log("Header Loaded");
    //alert.show("TokEn " + getToken());
    if (getToken())
    {
      setLogged(true);
      getConfig(CONFIG_TURNOS);
      getConfig(CONFIG_DIAGNOSTICOS);
    }

  }, []);
  
  const getConfig = (nombreConfig) => {

    ReportesAPI.getConfig(nombreConfig)
    .then(response => {
      //setToken(response.data);
      alert.show("Test "+nombreConfig+ ":" +  response.data);
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

    return(
        <div className="loginheader">
        <Paper elevation={3}>
          <img
            style={{ marginLeft: "5%", marginTop: "1%", marginBottom: "1%" }}
            src="https://www.experta.com.ar/wp-content/themes/bauhaus-child/icon/logo-experta-seguros.svg"
            alt="Experta logo"
          />
        </Paper>

        { logged ? 
          <button onClick={handleLogOut}>
            Cerrar Sesion
          </button>
        : null }

      </div>
    );
}
export default Header;