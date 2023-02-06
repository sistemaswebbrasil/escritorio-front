import axios, { AxiosResponse, HeadersDefaults } from "axios";
import handleAxiosResponseError from "./handleAxiosResponseError";
import handleAxiosResponseSuccess from "./handleAxiosResponseSuccess";

const Http = axios.create();

class Service {
  protected static Http = Http;
  protected static getData = getData;
}

function getData<T>(res: AxiosResponse<T>) {
  return res.data;
}

Http.defaults.baseURL = "https://escritorio.rejaneemicheleadvocacia.com.br/api"; //process.env.REACT_APP_API;

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
const token = localStorage.getItem("token");

if (token) {
  Http.defaults.headers = {
    Authorization: `Bearer ${token}`,
  } as any;
}

Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
);

export default Service;
