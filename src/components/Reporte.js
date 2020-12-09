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
  const alert = useAlert();
  const [done, setDone] = useState(false);

  const [edificiosVisible, setEdificiosVisible] = useState(false);
  const [usuariosVisible, setUsuariosVisible] = useState(false);
  const [fechaVisible, setFechaVisible] = useState(false);

  async function cargarGerencias() {
    const res = await getGerencias();
    setUsuarios(res.data);
  }

  async function cargarUsuarios() {
    const res = await getUsuariosDependientes();
    setUsuarios(res.data);
  }

  async function cargarReportes() {
    const res = await getReportes();
    setReportes(res.data);
    configBotonesActivos()
  }

  const configBotonesActivos = (reporteSel) =>
  {
    //reportes[reporteSel];
  };

  useEffect(() => {
    cargarGerencias(); //este ponerlo cuando elija report?
    cargarUsuarios(); //este ponerlo cuando elija report? y edificios 2099-1-1
    cargarReportes();
    const defaultSelFecha = [{ eID : 0, Nombre: 'Seleccionar Reporte', Direccion: '' }]
    setEdificios(defaultSelFecha);
    const defaultSelEdificio = [{ pID : 0, Nombre: 'Seleccionar Edificio',id : 0, horario: 'Seleccionar Edificio' }]
    setHorarios(defaultSelEdificio);
    setPisos(defaultSelEdificio);  
  }, []);

  const handleSubmit = () => {
    setSubmit(true);
}

  const formik = useFormik({
    initialValues: {
      fecha: "",
      usuario: "",
      edificio: "",
      piso: "",
      hora: "",
    },
    onSubmit: (values) => {
      const { fecha, usuario, edificio, piso, hora } = values;
      guardarReserva(usuario, fechaSel, piso, edificio, hora);
      setDone(true);
    },
  });

  const resetValues = () => {
    formik.values.edificio = "";
    formik.values.usuario = "";
    formik.values.piso = "";
    formik.values.hora = "";
    setSubmit(false);
  };

  const guardarReserva = (idUsuario, FechaTurno, IdPiso, IdEdificio, idHorarioEntrada) => {

    saveTurno(idUsuario, FechaTurno, IdPiso, IdEdificio, idHorarioEntrada)
        .then(response => {
          alert.show("Reserva grabada correctamente!");
          setDone(true);
        })          
            .catch(function(error) {
              if (error.response == undefined)
                alert.show("" + error);
              else
                alert.show("" + error.response.data.error);
            });
};

  async function handleDateChange(date) {
    resetValues();
    const fechaAux = formatISO(new Date(`${date}`), {
      representation: "date",
    });
    setFechaSel(fechaAux);
    const res = await getEdificios(fechaAux);
    setEdificios(res.data);
  }

  async function handleEdificiosChange(idEdificio) {
    if (idEdificio)
    {

      const res = await getPisos(idEdificio,fechaSel);
      setPisos(res.data);
      const res2 = await getHoras(idEdificio,fechaSel);
      setHorarios(res2.data);
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
        <div>
          <br/>
          <Container maxWidth="sm">
          <h1 className='ExpertaText'>Reserva tu Turno</h1>
          <p >Selecciona una fecha y un sitio para reservar!</p>
          <br/>
          <form onSubmit={formik.handleSubmit}
              //id="reserva-form"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}>
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
                          minDate={setMinutes(addDays(new Date(), 1), 30)}
                          maxDate={setMinutes(addDays(new Date(), 30), 30)}
                          showDisabledMonthNavigation
                          inline={formik.values.sucursalId !== ""}
                          excludeDates={populateFeriados(feriados)}
                        />
                      </div>
                    </FormControl>

                    {edificiosVisible != null && (
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
                          required
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
                    {usuariosVisible != null && (
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
                          required
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
                      required
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
                      {pisos &&
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
                          required
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
                              onClick={handleSubmit}
                              >
                                {hora.horario}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>

                  <div style={{ marginTop: "3%", alignSelf: "center" }}>  
                  {submit == true && (
                    <Button
                    style={{ alignSelf: "center" ,textTransform: "none", textAlign: "center", backgroundColor: "#0F1150", color: "white" }}
                    variant="contained"
                    type= 'submit'>Confirmar</Button>
                  )}     
                  </div>   
              </form>
          </Container>
        </div>
        <br/>
      </div>
      );
  }

export default Reporte;