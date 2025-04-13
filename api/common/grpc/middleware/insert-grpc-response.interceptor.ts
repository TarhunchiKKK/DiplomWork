import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, throwError } from "rxjs";

@Injectable()
export class InsertGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(
            map(data => ({ data })),
            catchError(error => throwError(() => ({ error })))
        );
    }
}
