import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class GrpcNotFoundInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(this.transformResponse));
    }

    private transformResponse<T>(value: T): { data: T[] } {
        return value === null || value === undefined ? { data: [] } : { data: [value] };
    }
}
