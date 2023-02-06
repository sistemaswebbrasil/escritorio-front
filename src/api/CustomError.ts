export type ErrorData = {
  status: number;
  timestamp: string;
  type: string;
  title: string;
  detail: string;
  error?: string;
  objects?: {
    name?: string;
    userMessage: string;
  };
  userMessage?: string;
  message?: string
};

export type ErrorType =
  | "ForbiddenError"
  | "InvalidDataError"
  | "SystemError"
  | "ResourceNotFoundError"
  | "BusinessError"
  | "GenericError";

class CustomError {
  static type: ErrorType;
  message?: string;
  data?: ErrorData;

  constructor(data: ErrorData) {
    this.message = data.userMessage || data.detail || data.error;
    this.data = data;
  }
}

export default CustomError;
