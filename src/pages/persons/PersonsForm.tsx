import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

function PersonsForm() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Formulário de Pessoas</Typography>
      </Grid>
    </Grid>
  );
}

export default PersonsForm;
