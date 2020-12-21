import React, { Component, useEffect, useState } from "react";
import Container from "@material-ui/core/Container"
import Header from "../shared/Header"
import Sidebar from "./Sidebar2"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useFormik } from "formik";
import { useAlert } from 'react-alert';
import ReactLoading from 'react-loading';

import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Zoom,
  } from "@material-ui/core";

  import { getReportes, getReporteDinamico } from '../apis/ReportesAPI';
  import { getEdificios, getPisos, getHoras, saveTurno } from '../apis/TurnosAPI';
  import { getGerencias, getUsuariosDependientes } from '../apis/UsuariosAPI';
  

const Reporte = (prop) => {

const isWeekday = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6;
};
  const [submit, setSubmit] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [feriados, setFeriados] = useState([]);
  const [gerencias, setGerencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [fechaSel, setFechaSel] = useState();
  const [repoSel, setRepoSel] = useState();
  const alert = useAlert();
  const [done, setDone] = useState(false);

  const [edificiosVisible, setEdificiosVisible] = useState(0);
  const [usuariosVisible, setUsuariosVisible] = useState(0);
  const [fechaVisible, setFechaVisible] = useState(0);
  const [gerenciasVisible, setGerenciasVisible] = useState(0);
  const [pisosVisible, setPisosVisible] = useState(0);
  const [horariosVisible, setHorariosVisible] = useState(0);
  const [loading, setLoading] = useState(true);

  async function cargarGerencias() {
    const res = await getGerencias();
    const defaultTodos = [{ id : null, Nombre: 'TODOS'}]
    Array.prototype.push.apply(defaultTodos, res.data);

    if (gerenciasVisible == 1 ) 
      setGerencias(defaultTodos);
    else
      setGerencias(res.data);
      setLoading(false);
  }

  async function cargarUsuarios() {
    const res = await getUsuariosDependientes();
    const defaultTodos = [{ dni : null, nombre: 'TODOS'}]
    Array.prototype.push.apply(defaultTodos, res.data);

    if (usuariosVisible == 1 ) 
      setUsuarios(defaultTodos);
    else
      setUsuarios(res.data);
      setLoading(false);
  }

  async function cargarEdificios() {
    const res = await getEdificios("2099-1-1");
    const defaultTodos = [{ eID : null, Nombre: 'TODOS', Direccion: '' }]
    Array.prototype.push.apply(defaultTodos, res.data);
    //?
    if (edificiosVisible == 1 ) 
      setEdificios(defaultTodos);
    else
      setEdificios(res.data);
      setLoading(false);
  }

  async function cargarReportes() {
    const res = await getReportes();
    setReportes(res.data);
    setLoading(false);
  }

  const configBotonesActivos = (idReporte) =>
  {
    reportes.map((reporte) => {
      if(reporte.Id === idReporte){
        setGerenciasVisible(reporte.SelGerencia);
        setUsuariosVisible(reporte.SelUsuario);
        setEdificiosVisible(reporte.SelEdificio);
        setHorariosVisible(reporte.SelHorario);
        setPisosVisible(reporte.SelPiso);
        setFechaVisible(reporte.SelFecha);
        setRepoSel(reporte.Nombre);
      }
    })
  };

  useEffect(() => {
    cargarReportes();
    const defaultSelFecha = [{ eID : 0, Nombre: 'Seleccionar Reporte', Direccion: '' }]
    setEdificios(defaultSelFecha);
    const defaultSelEdificio = [{ pID : 0, Nombre: 'Seleccionar Edificio',id : 0, horario: 'Seleccionar Edificio' }]
    setHorarios(defaultSelEdificio);
    setPisos(defaultSelEdificio);  
  }, []);


  const formik = useFormik({
    initialValues: {
      fecha: "",
      gerencia: "",
      usuario: "",
      edificio: "",
      piso: "",
      hora: "",
    },
    onSubmit: (values) => {
      const { gerencia, usuario, edificio, piso, hora,reporte } = values;
      validarYConsumirReporte(reporte,usuario, fechaSel, piso, edificio, hora,gerencia)
    },
  });

  const resetValues = () => {
    formik.values.gerencia = "";
    formik.values.edificio = "";
    formik.values.usuario = "";
    formik.values.piso = "";
    formik.values.hora = "";
  };

  var campos = [];
  var valores = [];

  const validarYAgregar = (valorBack,compValor,compActivo) =>
  {
    if (compActivo == 1)
    {
        campos.push(valorBack);
        valores.push(compValor == "" ? null : compValor);
    }
    else if (compActivo == 2)
    {
      if (compValor == null)
      {
        alert.show("El parametro " + valorBack + " es obligatorio!");
        return false;
      }
      campos.push(valorBack);
      valores.push(compValor == "" ? null : compValor);
    }
    return true;
  }

  function downloadFile(absoluteUrl) {

    /*const fechaAux = formatISO(new Date(), {
      representation: "date",
    });*/

    var link = document.createElement('a');
    link.href = absoluteUrl;
    link.download = 'Rep-'+ repoSel +'.CSV';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 };

  const validarYConsumirReporte = (idReporte,idUsuario, FechaTurno, IdPiso, IdEdificio, idHorarioEntrada,idGerencia) => {
    
    campos = [];
    valores = [];

    if (!validarYAgregar("gerencia",idGerencia,gerenciasVisible)) {return;};
    if (!validarYAgregar("usuario",idUsuario,usuariosVisible)) {return;};
    if (!validarYAgregar("edificio",IdEdificio,edificiosVisible)) {return;};
    if (!validarYAgregar("piso",IdPiso,pisosVisible)) {return;};
    if (!validarYAgregar("horario",idHorarioEntrada,horariosVisible)) {return;};
    if (!validarYAgregar("fecha",FechaTurno,fechaVisible)) {return;};

    //alert.show("campos " + campos + "valores " + valores);

    getReporteDinamico(idReporte,campos, valores, false)
    .then(response => {
      //Generacion de link <a href="data:application/octet-stream,DATA" download="FILENAME">TITLE</a>
      downloadFile("data:application/octet-stream," + response.data);
    }).catch(function(error) {
        if (error.response == undefined)
          alert.show("" + error);
        else
          alert.show("" + error.response.data.error);
      });
};

  async function handleDateChange(date) {
    //resetValues();
    const fechaAux = formatISO(new Date(`${date}`), {
      representation: "date",
    });
    setFechaSel(fechaAux);
  }

  async function cargarPisos(idEdificio) {
    const res = await getPisos(idEdificio,"2099-1-1");
    const defaultTodos = [{ pID : null, Nombre: 'TODOS'}]
    Array.prototype.push.apply(defaultTodos, res.data);

    if (pisosVisible == 1 ) 
      setPisos(defaultTodos);
    else
      setPisos(res.data);

      setLoading(false);

  }

  async function cargarHorarios(idEdificio) {
  
      const res = await getHoras(idEdificio,"2099-1-1");
      const defaultTodos = [{ id : null, horario: 'TODOS'}]
      Array.prototype.push.apply(defaultTodos, res.data);
  
      if (horariosVisible == 1 ) 
        setHorarios(defaultTodos);
      else
        setHorarios(res.data);

        setLoading(false);
    }

  async function handleEdificiosChange(idEdificio) {
    if (idEdificio)
    {
      await cargarPisos(idEdificio)
      await cargarHorarios(idEdificio)
    }
  }

  async function handleGerenciasChange(idGerencia) {
    if (idGerencia)
    {
     // await cargarPisos(idGerencia)
    }
  }

  async function handleReporteChange(idReporte) {
    if (idReporte)
    {
      
      resetValues();
      setLoading(true);
      await cargarGerencias();
      await cargarUsuarios();
      await cargarEdificios();
      configBotonesActivos(idReporte);
    }
  }

    function populateFeriados(holiday) {
      const feriadoData = [];
      if (holiday) {
        for (let a = 0; a < holiday.length; a++) {
          const day = holiday[a].fecha.replace(/-/g, "/");
          feriadoData.push(new Date(day));
        }
      }
      return feriadoData;
    }

    return (
      <div>
        <Header />
        <Sidebar />

        {loading ? (
      <Container maxWidth="sm">
        <ReactLoading type={"spin"} color={"#fff"} height={'50px'} width={'50px'}/>
      </Container>
      ) : ( 
        <div>
          <br/>
          <Container maxWidth="sm">
            <h1 className='ExpertaText'>Reporte</h1>
            <p >Selecciona un reporte</p>
            <br/>
            <form onSubmit={formik.handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}>

            <FormControl
            style={{
                marginTop: "3%",
                alignSelf: "center",
            }}
            >
            <InputLabel>
                <b>Elegí el reporte</b>
            </InputLabel>
            <Select
                id="reporte"
                name="reporte"
                required
                style={{
                marginBottom: "15px",
                minWidth: "50",
                }}
                value={formik.values.reporte}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleReporteChange(e.target.value);
                }}
            >
                {reportes &&
                reportes.map((reporte) => (
                    <MenuItem
                    style={{ fontSize: "11pt", fontFamily: "Armata" }}
                    key={`reporte_${reporte.Id}`}
                    value={reporte.Id}
                    >
                        {reporte.Nombre}
                    </MenuItem>
                ))}
            </Select>
          </FormControl>

          {fechaVisible > 0  && (   
          <FormControl style={{ alignSelf: "center" }}>
            <InputLabel>Elegí la fecha</InputLabel>
              <div id="datePicker">
                <DatePicker
                  style={{
                    marginTop: "10%",
                    marginRight: "10%",
                    width: "50%",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  id="fecha"
                  locale="es"
                  selected={formik.values.fecha}
                  name="fecha"
                  placeholderText="Elegí la fecha"
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="MMMM d, yyyy"
                  filterDate={isWeekday}
                  minDate={setMinutes(addDays(new Date(), -360), 30)}
                  maxDate={setMinutes(addDays(new Date(), 360), 30)}
                  showDisabledMonthNavigation
                  inline={formik.values.sucursalId !== ""}
                  excludeDates={populateFeriados(feriados)}
                />
              </div>
            </FormControl>
        )}

        {gerenciasVisible > 0  && (
          <FormControl
          style={{
              marginTop: "3%",
              alignSelf: "center",
          }}
          >
          <InputLabel>
              <b>Elegí la gerencia</b>
          </InputLabel>
          <Select
              id="gerencia"
              name="gerencia"
              required={gerenciasVisible == 2}
              style={{
              marginBottom: "15px",
              minWidth: "50",
              }}
              value={formik.values.gerencia}
              onChange={(e) => {
                formik.handleChange(e);
                handleGerenciasChange(e.target.value);
              }}
          >
              {gerencias &&
              gerencias.map((gerencia) => (
                  <MenuItem
                  style={{ fontSize: "11pt", fontFamily: "Armata" }}
                  key={`gerencia_${gerencia.id}`}
                  value={gerencia.id}
                  >
                      {gerencia.Nombre}
                  </MenuItem>
              ))}
          </Select>
        </FormControl>
        )}

        {usuariosVisible > 0  && (
            <FormControl
              style={{
                  marginTop: "3%",
                  alignSelf: "center",
              }}
              >
              <InputLabel>
                  <b>Elegí el colaborador</b>
              </InputLabel>
              <Select
                  id="usuario"
                  name="usuario"
                  required={usuariosVisible == 2}
                  style={{
                  marginBottom: "15px",
                  minWidth: "150",
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.usuario}
              >
                  {usuarios &&
                  usuarios.map((usuario) => (
                      <MenuItem
                      style={{ fontSize: "11pt", fontFamily: "Armata" }}
                      key={`usuario_${usuario.dni}`}
                      value={usuario.dni}
                      >
                          {usuario.nombre}
                      </MenuItem>
                  ))}
              </Select>
              </FormControl>
              )}    


            {edificiosVisible > 0  && (
              <FormControl
              style={{
                  marginTop: "3%",
                  alignSelf: "center",
              }}
              >
              <InputLabel>
                  <b>Elegí el sitio</b>
              </InputLabel>
              <Select
                  id="edificio"
                  name="edificio"
                  required={edificiosVisible == 2}
                  style={{
                  marginBottom: "15px",
                  minWidth: "50",
                  }}
                  value={formik.values.edificio}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleEdificiosChange(e.target.value);
                  }}
              >
                  {edificios &&
                  edificios.map((edificio) => (
                      <MenuItem
                      style={{ fontSize: "11pt", fontFamily: "Armata" }}
                      key={`edificio_${edificio.eID}`}
                      value={edificio.eID}
                      >
                          {edificio.Nombre} - {edificio.Direccion} 
                      </MenuItem>
                  ))}
              </Select>
            </FormControl>
            )}
            
            {pisosVisible > 0 && (
            <FormControl
            style={{
                marginTop: "3%",
                alignSelf: "center",
            }}
            >
            <InputLabel>
                <b>Elegí el piso</b>
            </InputLabel>
            <Select
                id="piso"
                name="piso"
                required={pisosVisible == 2}
                style={{
                marginBottom: "15px",
                minWidth: "150",
                }}
                onChange={(e) => {
                  formik.handleChange(e);
                  //setCupoPiso(e.target.value);
                }}
                value={formik.values.piso}
            >
                {pisos  &&
                pisos.map((piso) => (
                    <MenuItem
                    style={{ fontSize: "11pt", fontFamily: "Armata" }}
                    key={`piso_${piso.pID}`}
                    value={piso.pID}
                    >
                        {piso.Nombre}
                    </MenuItem>

                ))}
            </Select>
            </FormControl>
            )}

            {horariosVisible > 0  && (
            <FormControl
                style={{
                  marginTop: "3%",
                  alignSelf: "center",
                }}
              >
                <InputLabel>
                    <b>Elegí el horario</b>
                </InputLabel>
                <Select
                    id="hora"
                    name="hora"
                    required={horariosVisible == 2}
                    style={{
                    marginBottom: "15px",
                    minWidth: "150",
                    }}
                    onChange={(e) => {
                      formik.handleChange(e);
                      //setCupoHorario(e.target.value);
                    }}
                    value={formik.values.hora}
                >
                    {horarios &&
                    horarios.map((hora) => (
                        <MenuItem
                        style={{ fontSize: "11pt", fontFamily: "Armata" }}
                        key={`hora_${hora.id}`}
                        value={hora.id}
                        >
                          {hora.horario}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            )}
            <div style={{ marginTop: "3%", alignSelf: "center" }}>  
              <Button
              style={{ alignSelf: "center" ,textTransform: "none", textAlign: "center", backgroundColor: "#0F1150", color: "white" }}
              variant="contained"
              type= 'submit'>Confirmar</Button>  

            </div>   
          </form>
          </Container>
        </div>)}
        <br/>
      </div>
      );
  }

export default Reporte;