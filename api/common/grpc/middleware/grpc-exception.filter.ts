import { Catch, HttpException } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { IHttpError } from "../generated";
import { from, Observable } from "rxjs";
import { TGrpcResponse } from "../types";

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    public catch(exception: HttpException): Observable<TGrpcResponse> {
        console.log(exception);
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
}
