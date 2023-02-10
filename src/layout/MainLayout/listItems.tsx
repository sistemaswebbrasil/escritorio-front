import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RouterLink from "../../components/RouterLink";

export const mainListItems = (
  <React.Fragment>
    <RouterLink to="/" text="Dashboard" icon={<DashboardIcon />} />
    <RouterLink to="/persons" text="Pessoas" icon={<PeopleIcon />} />
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Admin
    </ListSubheader>
    <RouterLink
      to="/persons/form"
      text="Cadastrar Pessoa"
      icon={<PeopleIcon />}
    />
  </React.Fragment>
);
