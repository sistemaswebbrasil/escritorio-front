import { Grid, Typography } from "@mui/material";

const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
