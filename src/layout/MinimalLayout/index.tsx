import { Outlet } from "react-router-dom";
import Copyright from "../Copyright";

const MinimalLayout = () => (
  <>
    <Outlet />
    <Copyright />
  </>
);

export default MinimalLayout;
