import React, { Component, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Header from '../shared/Header'
import { useFormik } from "formik";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";

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
    .min(6, "El dni debe contener 6 caracteres o más")
    .required("requerido"),
    contraseña: Yup.string().required("requerido"),
  });
  const formik = useFormik({
    initialValues: {
      dni: "",
      contraseña: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
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
            <Link to="/vales" style={{ textDecoration: "none",alignSelf: "center" }}>
            <Button
              style={{ alignSelf: "center" ,textTransform: "none"}}
              variant="contained"
              type= 'submit'
            >
              Ingresar
            </Button>
            </Link>
            <br/>
          </form>
        </Container>
      </div>
    </div>
  );
};
export default Login;