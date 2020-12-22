import React, { useState, useEffect } from 'react';
import Container from "@material-ui/core/Container"
import * as TurnosAPI from "../apis/TurnosAPI";
import Header from "../shared/Header"
import Sidebar from "./Sidebar2"
import { FixedSizeList as List } from 'react-window';
import { useAlert } from 'react-alert';
import TodayIcon from '@material-ui/icons/Today';
import Divider from "@material-ui/core/Divider";
import ReactLoading from 'react-loading';
//import swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import swal from '@sweetalert/with-react'


const MisReservas = (prop) => {

  var QRCode = require('qrcode.react');

  const alert = useAlert();
  const [turnosActivos, setTurnosActivos] = useState([])
  const [turnosHistoricos, setTurnosHistoricos] = useState([])
  const [loading, setLoading] = useState(true)

  const [turnoActivo, setTurnoActivo] = useState(0)

  useEffect(() => {
    setLoading(true);
    getTurnosActivos();
    getTurnosHistorico(); 
  }, []);
  

  function getParsedDate(date){ 
    date = String(date).split(' '); 
    var days = String(date[0]).split('-'); 
    //var hours = String(date[1]).split(':'); 
    return [parseInt(days[2]) + '/' + parseInt(days[1]) + '/' + parseInt(days[0])]; 
  } 

  function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

  const getTurnosHistorico = () => {
    TurnosAPI.getTurnosHistoricos()
    .then(response => {
      var result = [];
      for(var i in response.data)
          result.push("Fecha: " + getParsedDate(response.data[i].FechaTurno.substr(0,10)) + " Sitio: " + response.data[i].Edificio + " " + response.data[i].Piso + ", Horario: " + response.data[i].Horario);
      setLoading(false);
      setTurnosHistoricos(result);
    })          
    .catch(function(error) {
      if (error.response == undefined)
        alert.show("" + error);
      else
        alert.show("" + error.response.data.error);
    });
  };

  const clickQR = () => {
    
   if (turnoActivo == 0)
   {
    swal(
      <div>
        <h1>El QR no se pudo generar...</h1>
        <br></br>
        No se encontraron turnos para el dia de hoy...
      </div>
    )
  }
  else
  {
    swal(
      <div>
        <h1>QR generado!</h1>
        <br/>
        <h3>{turnosActivos[0]}</h3>
        <br/>
        <p>
        <QRCode value={turnoActivo} />
        </p>
      </div>
    )
  }

  };

  const getTurnosActivos = () => {
    TurnosAPI.getTurnos()
    .then(response => {
      var result = [];
      for(var i in response.data)
      {
        if (i == 0 && response.data[i].FechaTurno.substr(0,10) == getCurrentDate('-'))
        {
          setTurnoActivo(response.data[i].TurnoId);
        }

        result.push("Fecha: " + getParsedDate(response.data[i].FechaTurno.substr(0,10)) + " Sitio: " + response.data[i].Edificio + " " + response.data[i].Piso + ", Horario: " + response.data[i].Horario);
      }
      setLoading(false);
      setTurnosActivos(result);
    })          
    .catch(function(error) {
      if (error.response == undefined)
        alert.show("" + error);
      else
        alert.show("" + error.response.data.error);
    });
  };

  const RowA = ({ index, style }) => (
    <div style={style}>
      
      <Button>
      <TodayIcon style={{color:"rgb(34, 87, 138)" ,height:'20px', width:'20px', marginRight : '10px'}}/>
        {turnosActivos[index]}
      </Button>
      
      <Divider />
    </div>
  );

  const RowH = ({ index, style }) => (
    <div style={style}>
      <Button >
      <TodayIcon style={{color:"rgb(134, 87, 80)" ,height:'20px', width:'20px', marginRight : '10px'}}/>
      {turnosHistoricos[index]}
      </Button>
      <Divider />
    </div>
  );
   
  
  const ListaTurnosActivos = () => (
    <List className="reservasActivas" style={{fontWeight: 'bold',textAlign: "center",borderColor: 'black', 
    borderWidth: 1 }}
      height={200}
      width={550}
      itemSize={35}
      itemCount={turnosActivos.length} > 
      {RowA}
    </List>
  );

  const ListaTurnosHistoricos = () => (
    <List className="reservasHistoricas" style={{fontWeight: 'bold',textAlign: "center"}}
      height={200}
      width={550}
      itemSize={35}
      itemCount={turnosActivos.length}>
      {RowH}
    </List>
  );
  
    return (  
      <div>
        <Header/>
        <Sidebar/>

        {loading ? (
      <Container maxWidth="sm">
        <ReactLoading type={"spin"} color={"#fff"} height={'50px'} width={'50px'}/>
      </Container>
      ) : ( 
        <div>
          <Container maxWidth="sm">
          
            <br/>
            <h1 className='ExpertaText' style={{marginTop:0, marginBottom:20}}>Mis Reservas</h1>


            <Button
              style={{ alignSelf: "center" ,textTransform: "none", textAlign: "center", backgroundColor: "#0F1150", color: "white" }}
              variant="contained"
              type= 'submit' onClick={clickQR}>Generar QR de ingreso</Button>  

        
            <p className='HomeDescr' style={{marginTop:25, marginBottom:25}}>Reservas Activas</p>
            <ListaTurnosActivos/>
            <p className='HomeDescr' style={{marginTop:25, marginBottom:25}}>Reservas Historicas</p>
            <ListaTurnosHistoricos/>
            <br/>
          </Container>
        </div> )}
      </div>
    )
}

export default MisReservas;