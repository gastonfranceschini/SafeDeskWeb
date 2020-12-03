import React from 'react';
import Header from '../shared/Header'
import { Container, MenuItem, Select, FormControl, InputLabel, Button, Zoom } from "@material-ui/core";

const Diagnostico = (props) => {
  return ( 
    <div>
      <Header />
      <div>
        <Container maxWidth="sm">
          <h1>SAFE DESK</h1>
          <p>Para comenzar Ingresá tu DNI y contraseña.</p>
        </Container>
      </div>
    </div>
  );
}
 
export default Diagnostico;