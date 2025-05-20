import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, tap } from "rxjs";

@Injectable()
export class WrapGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(
            tap(data => {
                console.log("WrapGrpcResponseGuard:");
                console.log(data);
            }),
            map(data => ({
                data
            }))
        );
    }
}
