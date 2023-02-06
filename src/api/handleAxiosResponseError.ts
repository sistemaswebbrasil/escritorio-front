import { AxiosError } from "axios";
import { ErrorData } from "./CustomError";
import {
  BusinessError,
  ForbiddenError,
  GenericError,
  InvalidDataError,
  ResourceNotFoundError,
  UnauthorizedError,
} from "./errors";

export default function handleAxiosResponseError(error: AxiosError<ErrorData>) {
  const { response } = error;

  if (response?.data) {
    const { data } = response;

    if (response?.status === 403) throw new ForbiddenError(data);
    if (response?.status === 400) throw new BusinessError(data);
    if (response?.status === 401) throw new UnauthorizedError(data);
    if (response?.status === 422) throw new InvalidDataError(data);
    if (response?.status === 404) throw new ResourceNotFoundError(data);
  }

  throw new GenericError({
    detail: response?.data.detail || error.message || "Erro desconhecido",
    status: response?.status || 500,
    userMessage:
      response?.data?.userMessage ||
      response?.data?.detail ||
      "Erro desconhecido",
    timestamp: response?.data?.timestamp || "",
    title: response?.data?.title || "Erro desconhecido",
    type: "GenericError",
  });
}
