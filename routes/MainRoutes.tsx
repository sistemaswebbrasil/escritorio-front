import { lazy } from "react";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isAuthenticate } from "store/reducers/login";

import { Navigate } from "react-router-dom";
import { RootState } from "store";
import PersonsForm from "../pages/persons/PersonsForm";

const Persons = Loadable(lazy(() => import("pages/persons")));

const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  dispatch(isAuthenticate());
  const login = useSelector((state: RootState) => state.login);
  const { user } = login;
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const MainRoutes = {
  path: "/",
  element: (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  ),
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/persons",
      element: <Persons />,
    },
    {
      path: "/persons/form/:id",
      element: <PersonsForm />,
    },
    {
      path: "/persons/form",
      element: <PersonsForm />,
    },    
  ],
};

export default MainRoutes;
