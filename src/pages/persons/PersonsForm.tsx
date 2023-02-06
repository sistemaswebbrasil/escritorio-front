import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";

import PersonService from "../../api/services/PersonService";
import { useNavigate } from "react-router";

function PersonsForm() {
  const navigate = useNavigate();
  const theme = createTheme();

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
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
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
                  </Box>
                </Container>
              </ThemeProvider>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default PersonsForm;
