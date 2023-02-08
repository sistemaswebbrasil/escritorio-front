import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import PersonService from "../../api/services/PersonService";
import { Person } from "../../types/Person";
import AddIcon from "@mui/icons-material/Add";

function PersonList() {
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

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Observação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default PersonList;
