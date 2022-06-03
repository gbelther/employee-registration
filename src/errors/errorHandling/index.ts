import { AxiosError } from "axios";

import { AppError } from "../appError";
import { IError } from "../IError";

class ErrorHandling {
  private _statusCode: number;
  private _message: string;

  constructor(error: AxiosError | any, defaultMessage?: string) {
    if (error instanceof AppError) {
      this._statusCode = error.statusCode ?? 400;
      this._message = error.message ?? (defaultMessage || "");
    } else {
      this._statusCode = error?.status ?? 400;
      this._message = error.message || defaultMessage;
    }
  }

  get error(): IError {
    return {
      statusCode: this._statusCode,
      message: this._message,
    };
  }
}

export { ErrorHandling };
