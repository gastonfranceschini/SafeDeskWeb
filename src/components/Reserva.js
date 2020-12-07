import React, { Component, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useFormik } from "formik";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useAlert } from 'react-alert';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Zoom,
  } from "@material-ui/core";

import Header from '../shared/Header';
import Sidebar from './Sidebar';
import { getEdificios, getPisos, getHoras, saveTurno } from '../apis/TurnosAPI';

const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

//en este metodo se envia la fecha a la base para recuperar el resto de los datos
const Reserva = () => {
    const [feriados, setFeriados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [edificios, setEdificios] = useState([]);
    const [pisos, setPisos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [fechaSel, setFechaSel] = useState();
    const alert = useAlert();

    const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();


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
          const fechaAux = formatISO(new Date(`${fecha}`), {
            representation: "date",
          });
          const obj = {
            fecha: fecha,
            usuario: usuario,
            edificio: edificio,
            piso: piso,
            hora: hora,
          };
          //dispatch(setTurnoValues(obj));
          //deshabilitar();
        },
      });

      async function handleDateChange(date) {
        const fechaAux = formatISO(new Date(`${date}`), {
          representation: "date",
        });
        setFechaSel(fechaAux);
        const res = await getEdificios(fechaAux);
        setEdificios(res.data);
      }

      async function handleEdificiosChange() {
        //formik.values.edificio esta siempre una valor atras, fix
        const res = await getPisos(formik.values.edificio,fechaSel);
        setPisos(res.data);
        const res2 = await getHoras(formik.values.edificio,fechaSel);
        setHorarios(res2.data);
        //alert.show("EdificiosChange" + fechaSel );
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

      /*useEffect(() => {
        try {
          setWidthText(width > 1023 ? "40%" : "60%");
          setMarginTop(width > 1023 ? "2%" : "8%");
          setWidthh(width > 1023 ? "50%" : "85%");
          getSucursalesFunc();
          getFeriadosFunc();
        } catch (err) {
          setError(err);
        }
      }, [width]);*/

    return (
    <div>
      <Header />
      <Sidebar />
      <div>
        <Container maxWidth="sm">
        <h1 className='ExpertaText'>Reserva tu Turno</h1>
        <p >Selecciona una fecha y un sitio para reservar!</p>
        <br/>
        <form onSubmit={formik.handleSubmit}
            id="reserva-form"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}>
            <Grid container className={classes.form}>
              <Grid item xs>
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
                </Grid>
                <Grid item xs>
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
                        style={{
                        marginBottom: "15px",
                        minWidth: "50",
                        }}
                        value={formik.values.edificio}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleEdificiosChange(e);
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
              </Grid>
              <Grid container>
                <Grid item xs>
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
                            style={{ fontSize: "11pt", fontFamily: "Roboto" }}
                            >
                                
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs>
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
                  </Grid>
                  </Grid>
                  <Grid container>
                  <Grid item xs>
                    
                  </Grid>
                  <Grid item xs>
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
                            >
                                {hora.horario}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                  </Grid>
                </Grid>
                <Button
                  style={{ alignSelf: "center" ,textTransform: "none"}}
                  variant="contained"
                  type= 'submit'>Confirmar</Button>
            </Grid>
            </form>
        </Container>
      </div>
    </div>
    );
}
export default Reserva;