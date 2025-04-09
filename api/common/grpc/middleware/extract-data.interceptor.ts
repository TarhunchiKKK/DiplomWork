import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ExtractDataInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(this.extractData));
    }

    private extractData<T>(value: { data?: T[] }): T {
        if (!value.data || value.data.length === 0) {
            console.log("exception");
            throw new NotFoundException();
        }

        return value.data[0];
    }
}
