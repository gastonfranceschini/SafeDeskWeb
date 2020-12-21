import React, { useState, useEffect } from 'react';
import Container from "@material-ui/core/Container"
import { ListItem,ListItemText } from '@material-ui/core';
import * as TurnosAPI from "../apis/TurnosAPI";
import Header from "../shared/Header"
import Sidebar from "./Sidebar2"
import { FixedSizeList as List } from 'react-window';
import { useAlert } from 'react-alert';
import TodayIcon from '@material-ui/icons/Today';
import Divider from "@material-ui/core/Divider";
import ReactLoading from 'react-loading';


const MisReservas = (prop) => {

  const alert = useAlert();
  const [turnosActivos, setTurnosActivos] = useState([])
  const [turnosHistoricos, setTurnosHistoricos] = useState([])
  const [loading, setLoading] = useState(true)

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

  const getTurnosActivos = () => {
    TurnosAPI.getTurnos()
    .then(response => {
      var result = [];
      for(var i in response.data)
          result.push("Fecha: " + getParsedDate(response.data[i].FechaTurno.substr(0,10)) + " Sitio: " + response.data[i].Edificio + " " + response.data[i].Piso + ", Horario: " + response.data[i].Horario);
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
      {turnosActivos[index]}
      <Divider />
    </div>
  );

  const RowH = ({ index, style }) => (
    <div style={style}>
      {turnosHistoricos[index]}
      <Divider />
    </div>
  );
   
  
  const ListaTurnosActivos = () => (
    <List style={{fontWeight: 'bold',textAlign: "center",borderColor: 'black', 
    borderWidth: 1 }}
      height={200}
      width={550}
      itemSize={35}
      itemCount={turnosActivos.length}> 
      {RowA}
    </List>
  );

  const ListaTurnosHistoricos = () => (
    <List style={{fontWeight: 'bold',textAlign: "center"}}
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
            <h1 className='ExpertaText' style={{marginTop:50, marginBottom:50}}>Mis Reservas</h1>
            
            <TodayIcon/>
            <p className='HomeDescr'>Reservas Activas</p>
      
            <ListaTurnosActivos/>
           
            <TodayIcon/>
            <p className='HomeDescr' style={{marginTop:50, marginBottom:50}}>Reservas Historicas</p>
            
            <ListaTurnosHistoricos/>
            <br/>
          </Container>
        </div> )}
      </div>
    )
}

export default MisReservas;