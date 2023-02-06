import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { Typography } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";

import PersonService from "../../api/services/PersonService";
import { useNavigate } from "react-router";

import { setUnauthenticated } from "../../store/reducers/login";
import { useDispatch } from "react-redux";

function PersonsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Formulário de Pessoas</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            note: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email("Must be a valid email").max(255),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await PersonService.create(values);
              setStatus({ success: false });
              setSubmitting(false);
              navigate("/persons");
            } catch (err: any) {
              console.log(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
              //throw new Error("Count is 5. Error Occurred.");
              console.log(err.message == "Credenciais Incorretas");
              if (err.message == "Credenciais Incorretas") {
                dispatch(setUnauthenticated());
                navigate("/login");
              }
              //
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    value={values.name}
                    label="Nome"
                    type="name"
                    id="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-name-login"
                    >
                      {errors.name}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="note"
                    value={values.note}
                    label="Observações"
                    multiline
                    rows={4}
                    id="note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.note && errors.note && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-note-login"
                    >
                      {errors.note}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ mt: 1 }}>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Salvar
                  </Button>
                </Box>
              </Container>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default PersonsForm;
