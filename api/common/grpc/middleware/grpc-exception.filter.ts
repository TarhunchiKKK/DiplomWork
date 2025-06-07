import { Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { IHttpError } from "../generated";
import { from, Observable } from "rxjs";
import { TGrpcResponse } from "../types";
import { STATUS_CODES } from "http";

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    public catch(exception: HttpException): Observable<TGrpcResponse> {
        if ("getResponse" in exception) {
            const { message, error, statusCode } = exception.getResponse() as IHttpError;

            return from([
                {
                    error: {
                        message: Array.isArray(message) ? message : [message],
                        error,
                        statusCode
                    }
                }
            ]);
        }

        return from([
            {
                error: {
                    message: ["Неизвестная ошибка"],
                    error: "Неизвестная ошибка",
                    statusCode: HttpStatus.BAD_REQUEST
                }
            }
        ]);
    }
}
