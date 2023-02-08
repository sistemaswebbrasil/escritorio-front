import axios, { AxiosError, AxiosResponse, HeadersDefaults } from "axios";
import { useEffect } from "react";
import { ErrorData } from "./CustomError";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import { setUnauthenticated } from "../store/reducers/login";

// axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

const AxiosInterceptor = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = useSelector((state: RootState) => state.login.token);

  if (token) {
    instance.defaults.headers = {
      Authorization: `Bearer ${token}`,
    } as any;
  }

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: AxiosError<ErrorData>) => {
      const { response } = error;
      if (response?.status === 401) {
        dispatch(setUnauthenticated());
        navigate("/login");
      }
      return Promise.reject();
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    instance.interceptors.request.use(
      (defaults) => {
        const token = localStorage.getItem("token");
        if (token) {
          defaults.headers.Authorization = `Bearer ${token}`;
        }
        return defaults;
      },
      (errors) => Promise.reject(errors)
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
