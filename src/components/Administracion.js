import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container, Checkbox, FormControl, FormGroup, FormControlLabel, FormHelperText } from "@material-ui/core";
import { useFormik } from "formik";
import * as Api from '../apis/ReportesAPI';
import Header from '../shared/Header';
import Sidebar from './Sidebar2';

import { useAlert } from 'react-alert';

const Administracion = (props) => {

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));
  const alert = useAlert();
  const CONFIG_TURNOS = "TurnosActivo";
  const CONFIG_DIAGNOSTICOS = "DiagnosticosActivo";
  const [done, setDone] = useState(false);
  const classes = useStyles();
  const [check, setCheck] = useState({
    reservaTurno: true,
    autoDiagnostico: true,
  });

  const handleChange = name => event => {
      setCheck({ ...check, [name]: event.target.checked });
    };

  const {reservaTurno, autoDiagnostico } = check;
  const error = [reservaTurno, autoDiagnostico].filter(v => v).length !== 2;

  const guardarConfig = (configNombre,configValor) => {

    Api.setConfig(configNombre,configValor ? 1 : 0)
        .then(response => {
          alert.show("Configurado Correctamente!");
          setDone(true);
        })          
            .catch(function(error) {
              if (error.response == undefined)
                alert.show("" + error);
              else
                alert.show("" + error.response.data.error);
            });
};

  const formik = useFormik({
    initialValues: {
      reservaTurno: false,
      autoDiagnostico: false,
    },
    onSubmit: (values) => {
      const { reservaTurno,autoDiagnostico } = values;
      guardarConfig(CONFIG_DIAGNOSTICOS,autoDiagnostico);
      guardarConfig(CONFIG_TURNOS,reservaTurno,);
    },
  });

  return ( 
    <div>
      <Header />
      <Sidebar />
      <div>
        <Container maxWidth="sm">
          <h1 className='ExpertaText'>Administracion:</h1>
          <div className={classes.root}>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={reservaTurno} onChange={handleChange('reservaTurno')} value="reservaTurno" />}
                    label="Habilitar reserva de turnos"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={autoDiagnostico} onChange={handleChange('autoDiagnostico')} value="autoDiagnostico" />}
                    label="Habilitar Autodiagnostico"
                  />
                  </FormGroup>
                   </FormControl>
              <Button
                style={{ alignSelf: "center" ,textTransform: "none"}}
                variant="contained"
                type= 'submit'>Guardar cambios</Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Administracion;