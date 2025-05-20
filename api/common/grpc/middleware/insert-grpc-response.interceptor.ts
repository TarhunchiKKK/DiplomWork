import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, tap } from "rxjs";

@Injectable()
export class WrapGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(
            tap(console.log),
            map(data => ({
                data
            }))
        );
    }
}
