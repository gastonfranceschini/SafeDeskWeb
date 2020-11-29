import React, { Component, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Header from '../shared/Header'
import { useFormik } from "formik";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { setToken,initAxiosInterceptors,setUserId } from "../utils/auth-helper";
import * as gVar from "../utils/properties";

const Login = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      width: "100%",
    },
    textField: {
      marginTop: theme.spacing(6),
    },
  }));
  const classes = useStyles();

  const validation = Yup.object().shape({
    dni: Yup.string()
    .min(3, "El dni debe contener 3 caracteres o más")
    .required("requerido"),
    contraseña: Yup.string().required("requerido"),
  });

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [cargando, setCargando] = useState(false)

  const LogIn = () => {
    setCargando(true);
     axios({
      method: "POST",
      url: gVar.api + "/api/auth/signin",
      data: {"email": email , "password": pass },
      headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        setToken(response.data.token);
        setUserId(response.data.userId);
        initAxiosInterceptors();
        setCargando(false);
        //resetStackAndNavigate(navigation,'home');
      })          
      .catch(function(error) {
        //Alert.alert("Error","Mensaje: " + error.response.data.error)
        setCargando(false);
      });
};

  const formik = useFormik({
    initialValues: {
      dni: "",
      contraseña: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log("test: " + values);
      const { dni, contraseña } = values;
      
    },
  });

  return (
    <div>
      <Header />
      <div>
        <Container maxWidth="sm">
          <h1>SAFE DESK</h1>
          <p>Para comenzar Ingresá tu DNI y contraseña.</p>
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
                //disabled={true}
                id="contraseña"
                name="contraseña"
                variant="outlined"
                helperText= {formik.errors.contraseña}
                error={formik.errors.contraseña}
              />
            </FormControl>

            <Button
              style={{ alignSelf: "center" ,textTransform: "none"}}
              variant="contained"
              type= 'submit'>
              Ingresar
            </Button>
            <Link to="/vales" style={{ textDecoration: "none",alignSelf: "center" }}>
            </Link>
            <br/>
          </form>
        </Container>
      </div>
    </div>
  );
};
export default Login;