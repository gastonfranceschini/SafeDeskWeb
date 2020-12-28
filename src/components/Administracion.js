import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container, Checkbox, FormControl, FormGroup, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import * as Api from '../apis/ReportesAPI';
import Header from '../shared/Header';
import Sidebar from './Sidebar2';
import * as ReportesAPI from "../apis/ReportesAPI";
import ReactLoading from 'react-loading';

import { useAlert } from 'react-alert';

const Administracion = (props) => {

  const CONFIG_TURNOS = "TurnosActivo";
  const CONFIG_DIAGNOSTICOS = "DiagnosticosActivo";

  const [turnosActivo, setTurnosActivo] = useState(true)
  const [diagnosticosActivo, setDiagnosticosActivo] = useState(true)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
      setLoading(true);
      getConfig(CONFIG_TURNOS);
      getConfig(CONFIG_DIAGNOSTICOS);
      
  }, []);
  
  const setConfig = (nombreConfig,valorConfig) => {

    
    switch (nombreConfig) {
      case CONFIG_TURNOS:
        setTurnosActivo(valorConfig);
        break;
      case CONFIG_DIAGNOSTICOS:
        setDiagnosticosActivo(valorConfig);
        break;
    }
  }

  const getConfig = (nombreConfig) => {

    ReportesAPI.getConfig(nombreConfig)
    .then(response => {
      setConfig(nombreConfig,response.data.valor == 1 ? true : false)
      setLoading(false);
    })          
    .catch(function(error) {
      if (error.response == undefined)
        alert.show("" + error);
      else
        alert.show("" + error.response.data.error);
    });
  };


  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));
  const alert = useAlert();

  const [done, setDone] = useState(false);
  const classes = useStyles();

  const handleChange = name => event => {  
      setConfig(name,event.target.checked)
    };

  const guardarConfig = (configNombre,configValor) => {

    Api.setConfig(configNombre,configValor ? 1 : 0)
        .then(response => {
          alert.show("Configurado " + configNombre + " correctamente!");
          setDone(true);
          setLoading(false);
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
      setLoading(true);
      guardarConfig(CONFIG_DIAGNOSTICOS,diagnosticosActivo);
      guardarConfig(CONFIG_TURNOS,turnosActivo);
    },
  });
  
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
                    control={<Checkbox checked={turnosActivo} onChange={handleChange(CONFIG_TURNOS)} value="reservaTurno" />}
                    label="Habilitar reserva de turnos"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={diagnosticosActivo} onChange={handleChange(CONFIG_DIAGNOSTICOS)} value="autoDiagnostico" />}
                    label="Habilitar Autodiagnostico"
                  />
                  </FormGroup>
                   </FormControl>

            <Button
              style={{ alignSelf: "center" ,textTransform: "none", textAlign: "center", backgroundColor: "#0F1150", color: "white" }}
              variant="contained"
              type= 'submit'>Guardar cambios</Button>  
                  
      
            
            </form>
          </div>
        </Container>
      </div>)}
    </div>
  );
}

export default Administracion;