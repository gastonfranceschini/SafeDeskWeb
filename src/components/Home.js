import React from 'react';
import Sidebar from './Sidebar';
import '../utils/App.css';
import Header from '../shared/Header'
import { Container, Checkbox, FormControl, FormGroup, FormControlLabel, FormHelperText } from "@material-ui/core";


const Home = (props) => {
  return ( 
    <div className="App">
      <Header />
      <Sidebar />
      <Container maxWidth="sm">
      <div className='HomeDescr'>
        <h1 className='ExpertaText'>Bienvenido!</h1>
        <br/>
        Safe Desk es una aplicación que nos permite a los colaboradores hacer una vuelta controlada y 
        ordenada a la oficina y sus instalaciones.
        <br/>
        <br/>
        <br/>
        Las funciones están acordes al momento que estamos viviendo permitiendo a 
        sus usuarios sacar turnos en días y horarios específicos con antelación.
        <br/>
        <br/>
        <br/>
        Hacemos todo lo posible por mantener las maximas medidas de seguridad, les deseamos un buen reencuentro con sus compañeros!
      </div>
      </Container>
      

    </div>
  );
}

 
export default Home;