import React, { Component, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Header from '../shared/Header'
import { useFormik } from "formik";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { withRouter, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { setToken, setUser, getUser, getToken } from "../utils/auth-helper";
import * as gVar from "../utils/properties";
import Home from "./Home";
import * as Auth from "../apis/AuthAPI";
import { useAlert } from 'react-alert';

const Login = () => {

  const alert = useAlert();

  
  const [cargando, setCargando] = useState(false)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (getToken()) 
    {
      setLogged(true);
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      width: "100%",
    },
    textField: {
      marginTop: theme.spacing(6),
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

  const validation = Yup.object().shape({
    dni: Yup.string()
    .min(3, "El dni debe contener 3 caracteres o más")
    .required("requerido"),
    password: Yup.string().required("requerido"),
  });

  const LogIn = (dni,password) => {
    setCargando(true);

    Auth.loginUser(dni,password)
    .then(response => {
      setToken(response.data.token);
      setUser(response.data);
      setCargando(false);
      alert.show("Bienvenido " +  getUser().Nombre);
      setLogged(true);
    })          
    .catch(function(error) {

      if (error.response == undefined)
        alert.show("" + error);
      else
        alert.show("" + error.response.data.error);

      setCargando(false);
    });
  };

  const formik = useFormik({
    initialValues: {
      dni: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      const { dni, password } = values;
      LogIn(dni,password);
    },
  });
  
  return (
    <div>
      <Header />
      <div>
        <Container maxWidth="sm">
          <h1 className='ExpertaText' style={{ fontSize : "50px" }}>SAFE DESK</h1>
          <p>Para comenzar ingresá tu DNI y contraseña.</p>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <FormControl className={classes.formControl}>
              <InputLabel>DNI</InputLabel>
              <TextField
                className={classes.textField}
                onChange={formik.handleChange}
                style={{ marginBottom: "2%" }}
                placeholder="Ingresá tu DNI"
                //disabled={true}
                id="dni"
                name="dni"
                variant="outlined"
                helperText= {formik.errors.dni}
                error={formik.errors.dni}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Contraseña</InputLabel>
              <TextField
                onChange={formik.handleChange}
                className={classes.textField}
                style={{ marginBottom: "2%" }}
                placeholder="Ingresá la contraseña"
                type="password"
                //disabled={true}
                id="password"
                name="password"
                variant="outlined"
                helperText= {formik.errors.password}
                error={formik.errors.password}
              />
            </FormControl>
            <Button
              className={classes.btn}
              variant="contained"
              type= 'submit'>Ingresar</Button>
            <br/>
          </form>
        </Container>
        { logged ? <Redirect to="/Home"/> : null }
      </div>
    </div>
  );
};
export default Login;