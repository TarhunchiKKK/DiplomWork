import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Empty } from "../generated";

@Injectable()
export class ReturnEmptyInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<unknown>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(this.returnEmpty));
    }

    private returnEmpty(): Empty {
        return {};
    }
}
