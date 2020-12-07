import React, { Component, useEffect, useState } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container, Checkbox, FormControl, FormGroup, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import * as Api from '../apis/DiagnosticosAPI';
import Header from '../shared/Header';
import Sidebar from './Sidebar';
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
  }));

  const classes = useStyles();

  const [done, setDone] = useState(false);

  const [check, setCheck] = useState({
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
  });

  const handleChange = name => event => {
    setCheck({ ...check, [name]: event.target.checked });
  };

  const { temperatura, gusto, contacto, embarazada, cancer, diabetes, hepatica, olfato, garganta, respiratoria } = check;
  const error = [temperatura, gusto, contacto, embarazada, cancer, diabetes, hepatica, olfato, garganta, respiratoria].filter(v => v).length !== 2;

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
      const { temperatura, gusto, contacto, embarazada, cancer, diabetes, hepatica, olfato, garganta, respiratoria } = values;
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
                        control={<Checkbox checked={temperatura} onChange={handleChange('temperatura')} value="temperatura" />}
                        label="Tengo temperatura mayor a 37°?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={gusto} onChange={handleChange('gusto')} value="gusto" />}
                        label="Tengo pérdida del gusto?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={contacto} onChange={handleChange('contacto')} value="contacto" />}
                        label="Tuve contacto cercano con COVID?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={embarazada} onChange={handleChange('embarazada')} value="embarazada" />}
                        label="Estoy embarazada?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={cancer} onChange={handleChange('cancer')} value="cancer" />}
                        label="Tengo/tuve cáncer?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={diabetes} onChange={handleChange('diabetes')} value="diabetes" />}
                        label="Tengo diabetes?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={hepatica} onChange={handleChange('hepatica')} value="hepatica" />}
                        label="Tengo alguna enfermedad hepática?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={olfato} onChange={handleChange('olfato')} value="olfato" />}
                        label="Tengo pérdida del olfato?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={garganta} onChange={handleChange('garganta')} value="garganta" />}
                        label="Tengo dolor de garganta?"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={respiratoria} onChange={handleChange('respiratoria')} value="respiratoria" />}
                        label="Tengo dificultad respiratoria?"
                      />
                    </FormGroup>
              </FormControl>
              <Button
                style={{ alignSelf: "center" ,textTransform: "none"}}
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