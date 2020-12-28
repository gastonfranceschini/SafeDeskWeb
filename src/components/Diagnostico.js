import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container, Checkbox, FormControl, FormGroup, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import * as Api from '../apis/DiagnosticosAPI';
import Header from '../shared/Header';
import Sidebar from './Sidebar2';
import { useAlert } from 'react-alert';

const Diagnostico = (props) => {

  const alert = useAlert();
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    btn:{
      alignSelf: "center" ,
      textTransform: "none", 
      textAlign: 'center', 
      backgroundColor: "#0F1150", 
      color: "white"
    }
  }));
  const classes = useStyles();

  const TEMPERATURA = "temperatura";
  const GUSTO = "gusto";
  const CONTACTO = "contacto";
  const EMBARAZADA = "embarazada";
  const CANCER = "cancer";
  const DIABETES = "diabetes";
  const HEPATICA = "hepatica";
  const OLFATO = "olfato";
  const GARGANTA = "garganta";
  const RESPIRATORIA = "respiratoria";

  const [done, setDone] = useState(false);

  const [temperatura, setTemperatura] = useState(false)
  const [gusto, setGusto] = useState(false)
  const [contacto, setContacto] = useState(false);
  const [embarazada, setEmbarazada] = useState(false);
  const [cancer, setCancer] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [hepatica, setHepatica] = useState(false);
  const [olfato, setOlfato] = useState(false);
  const [garganta, setGarganta] = useState(false);
  const [respiratoria, setRespiratoria] = useState(false);

  const setConfig = (nombreConfig,valorConfig) => {
    
    switch (nombreConfig) {
      case TEMPERATURA:
        setTemperatura(valorConfig);
        break;
      case GUSTO:
        setGusto(valorConfig);
        break;
      case CONTACTO: 
        setContacto(valorConfig);
        break;
      case EMBARAZADA:
        setEmbarazada(valorConfig);
        break;
      case CANCER:
        setCancer(valorConfig);
        break;
      case DIABETES: 
        setDiabetes(valorConfig);
        break;
      case HEPATICA:
        setHepatica(valorConfig);
        break;
      case OLFATO:
        setOlfato(valorConfig);
        break;
      case GARGANTA: 
        setGarganta(valorConfig);
        break;
      case RESPIRATORIA: 
        setRespiratoria(valorConfig);
        break;
    }
  }

  const handleChange = name => event => {  
      setConfig(name,event.target.checked)
    };

  const guardarDiagnostico = (temperatura, gusto, contacto, embarazada, cancer, diabetes, hepatica, olfato, garganta, respiratoria) => {

      Api.saveDiagnostico(temperatura, gusto, contacto, embarazada, cancer, diabetes, hepatica, olfato, garganta, respiratoria)
          .then(response => {
            alert.show("Guardado Correctamente!");
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
      temperatura: false,
      gusto: false,
      contacto: false,
      embarazada: false, 
      cancer: false,
      diabetes: false, 
      hepatica: false, 
      olfato: false, 
      garganta: false, 
      respiratoria: false
    },
    onSubmit: (values) => {
      guardarDiagnostico(temperatura, gusto, contacto, embarazada, cancer, diabetes, hepatica, olfato, garganta, respiratoria);
    },
  });

  // const diagnosticoValido = () => {
  //     Api.getUserDiagnostico()
  //         .then(response => {
  //           alert.show("Ya tienes un diagnóstico válido registrado.");
  //           setDone(true);
  //         })          
  //             .catch(function(error) {
  //               if (error.response == undefined)
  //                 alert.show("" + error);
  //               else
  //                 alert.show("" + error.response.data.error);
  //             });
  // }
  // diagnosticoValido()

  return ( 
    <div>
      <Header />
      <Sidebar />
      <div>
        <Container className='HomeDescr' maxWidth="sm">
          <h1 className='ExpertaText'>Diagnóstico:</h1>
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
                        control={<Checkbox checked={temperatura} onChange={handleChange(TEMPERATURA)} value="temperatura" />}
                        label="Tengo temperatura mayor a 37°?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={gusto} onChange={handleChange(GUSTO)} value="gusto" />}
                        label="Tengo pérdida del gusto?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={contacto} onChange={handleChange(CONTACTO)} value="contacto" />}
                        label="Tuve contacto cercano con COVID?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={embarazada} onChange={handleChange(EMBARAZADA)} value="embarazada" />}
                        label="Estoy embarazada?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={cancer} onChange={handleChange(CANCER)} value="cancer" />}
                        label="Tengo/tuve cáncer?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={diabetes} onChange={handleChange(DIABETES)} value="diabetes" />}
                        label="Tengo diabetes?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={hepatica} onChange={handleChange(HEPATICA)} value="hepatica" />}
                        label="Tengo alguna enfermedad hepática?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={olfato} onChange={handleChange(OLFATO)} value="olfato" />}
                        label="Tengo pérdida del olfato?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={garganta} onChange={handleChange(GARGANTA)} value="garganta" />}
                        label="Tengo dolor de garganta?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={respiratoria} onChange={handleChange(RESPIRATORIA)} value="respiratoria" />}
                        label="Tengo dificultad respiratoria?"
                      />
                    </FormGroup>
              </FormControl>
              <Button
                className={classes.btn}
                variant="contained"
                type= 'submit'>Enviar</Button>
                
            </form>
          </div>
        </Container>
      </div>
    { done ? <Redirect to="/Home"/> : null }
    </div>
  );
}
 
export default Diagnostico;