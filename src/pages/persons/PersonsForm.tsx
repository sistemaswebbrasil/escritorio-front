import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router";

import { setUnauthenticated } from "../../store/reducers/login";
import { useDispatch } from "react-redux";
import { Person } from "../../types/Person";
import { CleaningServices } from "@mui/icons-material";
import axios from "../../api/Axios";

function PersonsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [entity, setEntity] = useState<Person>();

  useEffect(() => {
    if (id) {
      PersonService.getById(Number(id)).then((response) => {
        setEntity(response);
      });
    }
  }, [id]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Formulário de Pessoas</Typography>
        {JSON.stringify(entity)}
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
            if (id) {
              try {
                await PersonService.update(Number(id), values);
                setStatus({ success: false });
                setSubmitting(false);
                navigate("/persons");
              } catch (err: any) {
                console.log(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            } else {
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
              }
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
            setFieldValue,
          }) => {
            const [user, setUser] = useState({});
            const [showPassword, setShowPassword] = useState(false);

            useEffect(() => {
              if (id) {
                PersonService.getById(Number(id)).then((response: any) => {
                  setEntity(response);
                  const fields = ["name", "email", "note"];
                  fields.forEach((field) =>
                    setFieldValue(field, response[field], false)
                  );
                });
              }
            }, [id]);

            // useEffect(() => {
            //   if (!isAddMode) {
            //     // get user and set form fields
            //     userService.getById(id).then(user => {
            //       const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
            //       fields.forEach(field => setFieldValue(field, user[field], false));
            //       setUser(user);
            //     });
            //   }
            // }, []);
            return (
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
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default PersonsForm;
