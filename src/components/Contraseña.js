import Header from '../shared/Header';
import Sidebar from './Sidebar2';
import React, { Component, useEffect, useState } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { useAlert } from 'react-alert';
import { getUser } from '../utils/auth-helper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, TextField, InputLabel, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { changePassword } from '../apis/UsuariosAPI';


const Contrasena = () => {

  const validation = Yup.object().shape({
    actualPassword: Yup.string()
    .required("requerido"),
    newPassword: Yup.string()
    .required("requerido"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
    .required("requerido"),
  });

  const [done, setDone] = useState(false);
  const alert = useAlert();

    const useStyles = makeStyles((theme) => ({
        formControl: {
          width: "100%",
        },
        textField: {
          marginTop: theme.spacing(6),
          marginRight: theme.spacing(6),
        },
        btn:{
          alignSelf: "center" ,
          textTransform: "none",
          display: "flex",
          textAlign: 'center', 
          backgroundColor: "#0F1150", 
          color: "white"
        }
      }));
      const classes = useStyles();

      const cambiarContraseña = () => {
        changePassword(getUser().userId, formik.values.actualPassword, formik.values.newPassword)
            .then(response => {
              alert.show("Contraseña cambiada correctamente!");
              setDone(true);
            })          
                .catch(function(error) {
                  if (error.response == undefined)
                    alert.show("" + error);
                  else
                    alert.show("" + error.response.data.error);
                });
      }

      const formik = useFormik({
        initialValues: {
          actualPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            cambiarContraseña();
        },
      });

  return (
    <div>
        <div>
            <Header/>
            <Sidebar/>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='divPerfil'>
              <div>
                  <h1 className='ExpertaText'>Cambiar Contraseña</h1>
              </div>
              <Paper className='paperPerfil'>
              <FormControl className={classes.formControl}>
                <InputLabel>Contraseña Actual</InputLabel>
                <TextField
                  onChange={formik.handleChange}
                  className={classes.textField}
                  style={{ marginBottom: "2%" }}
                  placeholder="Ingresá tu contraseña actual"
                  //disabled={true}
                  id="actualPassword"
                  name="actualPassword"
                  variant="outlined"
                  helperText= {formik.errors.actualPassword}
                  error={formik.errors.actualPassword}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Contraseña Nueva</InputLabel>
                <TextField
                  onChange={formik.handleChange}
                  className={classes.textField}
                  style={{ marginBottom: "2%" }}
                  placeholder="Ingresá la contraseña nueva"
                  type="password"
                  //disabled={true}
                  id="newPassword"
                  name="newPassword"
                  variant="outlined"
                  helperText= {formik.errors.newPassword}
                  error={formik.errors.newPassword}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Confirmar Contraseña</InputLabel>
                <TextField
                  onChange={formik.handleChange}
                  className={classes.textField}
                  style={{ marginBottom: "2%" }}
                  placeholder="Ingresá la misma contraseña"
                  type="password"
                  //disabled={true}
                  id="confirmPassword"
                  name="confirmPassword"
                  variant="outlined"
                  helperText= {formik.errors.confirmPassword}
                  error={formik.errors.confirmPassword}
                />
              </FormControl>
                  <div>
                      <Button
                      className={classes.btn}
                      variant="contained"
                      type= 'submit'>Confirmar</Button>
                  </div>
              </Paper>
          </div>
        </form>
        { done ? <Redirect to="/Home"/> : null }
    </div>
  );
}

export default Contrasena;