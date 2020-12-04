import React, { Component, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { setMinutes, getDay, addDays, formatISO } from "date-fns";
import { useFormik } from "formik";
import Container from "@material-ui/core/Container";
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Zoom,
  } from "@material-ui/core";
import Header from '../shared/Header';

const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

//en este metodo se envia la fecha a la base para recuperar el resto de los datos
const Reserva = () => {
    const [feriados, setFeriados] = useState([]);
    const [gerencias, setGerencias] = useState([]);

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
    <FormControl>
        <div>
            <Header />
        </div>
        <Container maxWidth="sm">
        <h1>Reserva tu Turno</h1>
        <p>Para ir a trabajar a la oficina.</p>
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
            </form>
        </Container>
    </FormControl>
    );
}
export default Reserva;