import React, { Component, useEffect, useState } from "react";
import Container from "@material-ui/core/Container"
import Header from "../shared/Header"
import Sidebar from "./Sidebar2"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useFormik } from "formik";
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Zoom,
  } from "@material-ui/core";

  import { getReportes, getReporteDinamico } from '../apis/TurnosAPI';
  import { getEdificios, getPisos, getHoras, saveTurno } from '../apis/ReportesAPI';
  import { getGerencias, getUsuariosDependientes } from '../apis/UsuariosAPI';
  

const Reporte = (prop) => {
  
const isWeekday = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6;
};

  const [reportes, setReportes] = useState([]);
  const [feriados, setFeriados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [fechaSel, setFechaSel] = useState();
  const alert = useAlert();
  const [done, setDone] = useState(false);


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

  const configBotonesActivos = () =>
  {
    NULL;
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

  const formik = useFormik({
      initialValues: {
        fecha: "",
        gerencia: "",
        edificio: "",
        piso: "",
        hora: "",
      },
      onSubmit: (values) => {
        const { fecha, gerencia, edificio, piso, hora } = values;
        const fechaAux = formatISO(new Date(`${fecha}`), {
          representation: "date",
        });
        const obj = {
          fecha: fecha,
          gerencia: gerencia,
          edificio: edificio,
          piso: piso,
          hora: hora,
        };
        //dispatch(setTurnoValues(obj));
        //deshabilitar();
      },
    });

    function handleDateChange(date) {
        //en este metodo se va a enviar la fecha al back para recuperar los demas datos
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
        <Header/>
        <Sidebar/>
        <div>
        <Container maxWidth="sm">
        <h1 className='ExpertaText'>Reportes</h1>
        <br/>
        <form onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}>
            <FormControl>
            <InputLabel>Elegí la fecha</InputLabel>
                <div id="datePicker">
                  <DatePicker
                    style={{
                      marginTop: "10%",
                      marginRight: "10%",
                      width: "50%",
                      alignSelf: "center",
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
                    <b>Elegí la gerencia</b>
                </InputLabel>
                <Select
                    id="gerencia"
                    name="gerencia"
                    style={{
                    marginBottom: "15px",
                    minWidth: "150",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.gerencia}
                >
                    {gerencias &&
                    gerencias.map((gerencia) => (
                        <MenuItem
                        style={{ fontSize: "11pt", fontFamily: "Roboto" }}
                        >
                            
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
                    <b>Elegí el colaborador</b>
                </InputLabel>
                <Select
                    id="gerencia"
                    name="gerencia"
                    style={{
                    marginBottom: "15px",
                    minWidth: "150",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.gerencia}
                >
                    {gerencias &&
                    gerencias.map((gerencia) => (
                        <MenuItem
                        style={{ fontSize: "11pt", fontFamily: "Roboto" }}
                        >
                            
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
                    <b>Elegí el sitio</b>
                </InputLabel>
                <Select
                    id="gerencia"
                    name="gerencia"
                    style={{
                    marginBottom: "15px",
                    minWidth: "150",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.gerencia}
                >
                    {gerencias &&
                    gerencias.map((gerencia) => (
                        <MenuItem
                        style={{ fontSize: "11pt", fontFamily: "Roboto" }}
                        >
                            
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
                    id="gerencia"
                    name="gerencia"
                    style={{
                    marginBottom: "15px",
                    minWidth: "150",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.gerencia}
                >
                    {gerencias &&
                    gerencias.map((gerencia) => (
                        <MenuItem
                        style={{ fontSize: "11pt", fontFamily: "Roboto" }}
                        >
                            
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
                    id="gerencia"
                    name="gerencia"
                    style={{
                    marginBottom: "15px",
                    minWidth: "150",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.gerencia}
                >
                    {gerencias &&
                    gerencias.map((gerencia) => (
                        <MenuItem
                        style={{ fontSize: "11pt", fontFamily: "Roboto" }}
                        >
                            
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>

            </form>
        </Container>
        </div>
      </div>
    );
  }

export default Reporte;