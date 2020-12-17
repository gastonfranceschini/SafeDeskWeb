import Header from '../shared/Header';
import Sidebar from './Sidebar2';
import React, { Component, useEffect, useState } from "react";
import { useAlert } from 'react-alert';
import Button from "@material-ui/core/Button";
import { getUser } from '../utils/auth-helper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, TextField, InputLabel, Typography } from "@material-ui/core";
import { useFormik } from "formik";


const Contrasena = () => {

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

      const formik = useFormik({
        initialValues: {
          actualPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
        onSubmit: (values) => {
            equalPass();
        },
      });

      const equalPass = () => {
          let pass = document.getElementById("newPassword");
          let confirm = document.getElementById("confirmPassword");
          if(pass != confirm){
            window.alert("Las contraseñas deben coincidir");
          }
      }

      useEffect(() => {
        
      }, []);

  return (
    <div>
        <div>
            <Header/>
            <Sidebar/>
        </div>
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
                helperText= {formik.errors.password}
                error={formik.errors.password}
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
                helperText= {formik.errors.password}
                error={formik.errors.password}
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
                helperText= {formik.errors.password}
                error={formik.errors.password}
              />
            </FormControl>
                <div>
                    <Button
                    onClick={equalPass}
                    className={classes.btn}
                    variant="contained"
                    type= 'submit'>Confirmar</Button>
                </div>
            </Paper>
        </div>
    </div>
  );
}

export default Contrasena;