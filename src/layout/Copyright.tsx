import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://rejaneemicheleadvocacia.com.br/">
        Gerenciador de Escritório
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
