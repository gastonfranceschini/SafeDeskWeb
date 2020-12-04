import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from 'react';

const Header = () => {

  /*
  
        <img
            style={{ marginRight: '20px',  marginBottom: "1%", width:95 }}
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Grupo-Werthein-01.png"
            alt="W logo"
          />*/

    return(
        <div className="loginheader">
        <Paper elevation={3}>
          <img
            style={{ marginLeft: "5%", marginTop: "2%", marginBottom: "2%" }}
            src="https://www.experta.com.ar/wp-content/themes/bauhaus-child/icon/logo-experta-seguros.svg"
            alt="Experta logo"
          />
        </Paper>
      </div>
    );
}
export default Header;