import React, { Component, useEffect, useState } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useFormik } from "formik";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useAlert } from 'react-alert';
import swal from "sweetalert2";
import * as Yup from "yup";

import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Zoom,
  } from "@material-ui/core";

import Header from '../shared/Header';
import Sidebar from './Sidebar2';
import { getEdificios, getPisos, getHoras, saveTurno } from '../apis/TurnosAPI';
import { getUsuariosDependientes } from '../apis/UsuariosAPI';
import { getUserDiagnostico } from '../apis/DiagnosticosAPI';

const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

//en este metodo se envia la fecha a la base para recuperar el resto de los datos
const Reserva = () => {
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState("");
    const [feriados, setFeriados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [edificios, setEdificios] = useState([]);
    const [pisos, setPisos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [fechaSel, setFechaSel] = useState();
    const alert = useAlert();
    const [done, setDone] = useState(false);

    /*const useStyles = makeStyles((theme) => ({
      formControl: {
        width: "100%",
      },
      textField: {
        marginTop: theme.spacing(6),
      },
      form: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }
    }));
    const classes = useStyles();*/

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

      async function cargarUsuarios() {
        const res = await getUsuariosDependientes();
        setUsuarios(res.data);
      }

      const isDiagActive = () => {
        if(!getUserDiagnostico()){
          swal
            .fire({
              title: "Advertencia",
              text: "Debe realizar el autodiagóstico para poder reservar un turno.",
              icon: "warning",
              confirmButtonColor: "#009bdb",
              confirmButtonText: "OK",
              animation: true,
            })
            .then((result) => {
              if (result.value) { 
                window.location.replace("/Diagnostico");
              }
            });
        }
      }

      useEffect(() => {
          /*setWidthText(width > 1023 ? "40%" : "60%");
          setMarginTop(width > 1023 ? "2%" : "8%");
          setWidthh(width > 1023 ? "50%" : "85%");*/
          isDiagActive();
        cargarUsuarios();
        const defaultSelFecha = [{ eID : 0, Nombre: 'Seleccionar Fecha', Direccion: '' }]
        setEdificios(defaultSelFecha);
        const defaultSelEdificio = [{ pID : 0, Nombre: 'Seleccionar Edificio',id : 0, horario: 'Seleccionar Edificio' }]
        setHorarios(defaultSelEdificio);
        setPisos(defaultSelEdificio);  
      }, /*[width]*/[]);

      const handleSubmit = () => {
          setSubmit(true);
      }

      let cupoE = null
      const setCupoE = (value) => {
        edificios.map((edificio) => {
          if(edificio.eID === value.eID){
            cupoE = edificio.Cupo;
          }
        })
        
      }

      const resetValues = () => {
        formik.values.edificio = "";
        formik.values.usuario = "";
        formik.values.piso = "";
        formik.values.hora = "";
        setSubmit(false);
      };


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
                            onChange={setCupoE(edificio)}
                            >
                                {edificio.Nombre} - {edificio.Direccion} - {edificio.Cupo}
                            </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {cupoE != null && (
                    <InputLabel style={{ color: "blue" }}>
                      <b>{`Cupo: ${cupoE}`}</b>
                    </InputLabel>
                  )}

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
                    onChange={formik.handleChange}
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
                        onChange={formik.handleChange}
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
      { done ? <Redirect to="/Home"/> : null }
    </div>
    );
}
export default Reserva;