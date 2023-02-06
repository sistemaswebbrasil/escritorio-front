import axios, { AxiosError, AxiosResponse, HeadersDefaults } from "axios";
import { useEffect } from "react";
import { ErrorData } from "./CustomError";
import { useNavigate } from "react-router-dom";
import handleAxiosResponseError from "./handleAxiosResponseError";
import handleAxiosResponseSuccess from "./handleAxiosResponseSuccess";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import { setUnauthenticated } from "../store/reducers/login";

// axios instance
const instance = axios.create({
  baseURL: "https://escritorio.rejaneemicheleadvocacia.com.br/api",
});

const AxiosInterceptor = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = useSelector((state: RootState) => state.login.token);
  console.log(token);

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
      console.log("errInterceptor");
      if (response?.status === 401) {
        dispatch(setUnauthenticated());
        navigate("/login");
      }

      return Promise.reject();
    };

    const interceptor = instance.interceptors.response.use(
      handleAxiosResponseSuccess,
      handleAxiosResponseError
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
