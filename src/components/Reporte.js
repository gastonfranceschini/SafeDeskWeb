import React from 'react';
import Container from "@material-ui/core/Container"

import Header from "../shared/Header"
import Sidebar from "./Sidebar"

const Reporte = (prop) => {
    return (  
      <div>
        <Header/>
        <Sidebar/>
        <div>
          <Container maxWidth="sm">
            <h1>Reportes</h1>
          </Container>
        </div>
      </div>
    )
}

export default Reporte;