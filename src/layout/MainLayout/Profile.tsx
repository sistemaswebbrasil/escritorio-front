import { IconButton, Badge, Grid } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { setUnauthenticated } from "../../store/reducers/login";

export default function Profile() {
  const login = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = login;

  const handleLogout = async () => {
    dispatch(setUnauthenticated());
    navigate("/login");
  };

  return (
    <div>
      <Grid>
        {user}
        <IconButton color="inherit">
          <Badge color="secondary">
            <Person2RoundedIcon />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={handleLogout} title="Deslogar">
          <PowerSettingsNewRoundedIcon />
        </IconButton>
      </Grid>
    </div>
  );
}
