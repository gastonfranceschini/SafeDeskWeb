import React, { useEffect } from "react";
import Sidebar from './Sidebar2';
import '../utils/App.css';
import Header from '../shared/Header'
import { Container } from "@material-ui/core";
import { getUser } from '../utils/auth-helper';
import swal from "sweetalert2";


const Home = (props) => {

  useEffect(() => {

    if (getUser().CambioPassObligatorio == 1)
    {
      swal
      .fire({
        title: "Advertencia",
        text: "Debe realizar un cambio de password antes de continuar!",
        icon: "warning",
        confirmButtonColor: "#009bdb",
        confirmButtonText: "OK",
        animation: true,
      })
      .then((result) => {
        //if (result.value) { 
          window.location.replace("/Contrasena");
        //}
      });
    }
    
}, []);

  return ( 
    <div className="App">
      <Header />
      <Sidebar />
      <Container maxWidth="sm">
      <div className='HomeDescr'>
        <h1 className='ExpertaText'>¡Bienvenido!</h1>
        <br/>
        Safe Desk es una herramienta que te permite reservar un puesto de trabajo para los días que vas a la oficina. 
        De esta manera, aseguramos el cumplimiento de los protocolos para una estadía segura y ordenada.
        <br/>
        <br/>
        <br/>
        A través de Safe Desk podrás sacar turnos en días y horarios específicos con antelación para ocupar un escritorio en el Edificio de Iberá. 
        <br/>
        <br/>
        <br/>
        Seguí estos consejos y normas de prevención para cuidarnos entre todos.
        <br/>
        <br/>
        <a href="/Reserva">
        Reservar nuevo turno
        </a>
      </div>
      </Container>
      

    </div>
  );
}
 
export default Home;