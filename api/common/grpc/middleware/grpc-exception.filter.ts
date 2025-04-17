import { Catch, HttpException } from "@nestjs/common";
import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { IHttpError } from "../generated";
import { from, Observable } from "rxjs";
import { TGrpcResponse } from "../types";

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    public catch(exception: HttpException): Observable<TGrpcResponse> {
        return from([
            {
                error: exception.getResponse() as IHttpError
            }
        ]);
    }
}
