import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from 'react';


const Header = () => {

    useEffect(() => {
      console.log("Header Loaded");
    }, [])

    return(
        <div className="loginheader">
        <Paper elevation={3}>
          <img
            style={{ marginLeft: "5%", marginTop: "1%", marginBottom: "1%" }}
            src="https://www.experta.com.ar/wp-content/themes/bauhaus-child/icon/logo-experta-seguros.svg"
            alt="Experta logo"
          />
        </Paper>
      </div>
    );
}
export default Header;