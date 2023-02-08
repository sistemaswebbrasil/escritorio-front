import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import PersonService from "../../api/services/PersonService";
import { Person } from "../../types/Person";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Action",
    renderCell: (i) => (
      <>
        <IconButton
          aria-label="delete"
          size="small"
          component={Link}
          to={`/persons/form/${i.id}`}
          title="Editar Pessoa"
        >
          <CreateIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  },
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nome", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "note", headerName: "Observação", width: 300 },
];

export default function DataTable() {
  const [rows, setRows] = useState<Person[]>([]);

  useEffect(() => {
    PersonService.getAllPersons().then((response) => {
      setRows(response);
    });
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Lista de Pessoas</Typography>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Button
          component={Link}
          to="/persons/form"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Adicionar Pessoa
        </Button>
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
    </Grid>
  );
}
