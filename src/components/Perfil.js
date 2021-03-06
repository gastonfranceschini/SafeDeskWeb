import Header from '../shared/Header';
import Sidebar from './Sidebar2';
import React from "react";
import Button from "@material-ui/core/Button";
import { getUser } from '../utils/auth-helper';
import Paper from '@material-ui/core/Paper';

const Perfil = () => {

    const goChange = () => {
        window.location.replace("/Contrasena");
    }

  return (
    <div>
        <div>
            <Header/>
            <Sidebar/>
        </div>
        <div className='divPerfil'>
        <h1 className='ExpertaText'>Perfil</h1>
                <br></br>
            
            <Paper className='paperPerfil'>
                <div>
                    <p className='txtTit'>Nombre y Apellido</p>
                    <p className='txtUsr'>{getUser().Nombre}</p>
                </div>
                <div>
                    <p className='txtTit'>DNI</p>
                    <p className='txtUsr'>{getUser().userId}</p>
                </div>
                <div>
                    <p className='txtTit'>E-mail</p>
                    <p className='txtUsr'>{getUser().Email}</p>
                </div>
                <div>
                    <p className='txtTit'>Gerencia</p>
                    <p className='txtUsr'>{getUser().Gerencia}</p>
                </div>
                <div>
                    <p className='txtTit'>Contraseña</p>
                    <Button
                    style={{ marginTop: "5pt", alignSelf: "left" ,textTransform: "none", backgroundColor: "#0F1150", color: "white" }}
                    variant="contained"
                    onClick={goChange}
                    >Cambiar</Button>
                </div>
            </Paper>
            <br/>
        </div>
    </div>
  );
}

export default Perfil;