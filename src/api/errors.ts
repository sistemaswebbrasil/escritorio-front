import CustomError, { ErrorData, ErrorType } from "./CustomError";

export class BusinessError extends CustomError {
  static type = "BusinessError" as ErrorType;
}

export class ForbiddenError extends CustomError {
  static type = "ForbiddenError" as ErrorType;
}

export class UnauthorizedError extends CustomError {
  static type = "UnauthorizedError" as ErrorType;
  constructor(params: ErrorData) {
    super(params);
    this.message = "Credenciais Incorretas";
  }
}

export class GenericError extends CustomError {
  static type = "GenericError" as ErrorType;
}

export class IncomprehensibleMessageError extends CustomError {
  static type = "IncomprehensibleMessageError" as ErrorType;
}

export class InvalidDataError extends CustomError {
  static type = "InvalidDataError" as ErrorType;
}

export class InvalidParameterError extends CustomError {
  static type = "InvalidParameterError" as ErrorType;
}

export class ResourceNotFoundError extends CustomError {
  static type = "ResourceNotFoundError" as ErrorType;
}

export class SystemError extends CustomError {
  static type = "SystemError" as ErrorType;
}
