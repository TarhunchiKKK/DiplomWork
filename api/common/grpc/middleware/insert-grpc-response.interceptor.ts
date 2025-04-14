import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, throwError } from "rxjs";
import { TGrpcResponse } from "../types";
import { IHttpError } from "../generated";

@Injectable()
export class InsertGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>) {
        console.log("interceptor");
        return next.handle().pipe(
            map(data => {
                console.log("data in interceptor");
                return { data };
            }),
            catchError(exception => throwError(this.mapError(exception)))
        );
    }

    private mapError(exception: HttpException): TGrpcResponse {
        const error = exception.getResponse() as IHttpError;

        console.log("error in interceptor");

        return {
            error
        };
    }
}
