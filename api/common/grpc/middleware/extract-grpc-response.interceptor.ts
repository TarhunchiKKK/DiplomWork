import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NestInterceptor,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { TGrpcResponse } from "../types";

const exceptionTypesMap: Record<number, new (_: string[]) => HttpException> = {
    [HttpStatus.BAD_REQUEST]: BadRequestException,
    [HttpStatus.NOT_FOUND]: NotFoundException,
    [HttpStatus.UNAUTHORIZED]: UnauthorizedException,
    [HttpStatus.INTERNAL_SERVER_ERROR]: InternalServerErrorException
};

@Injectable()
export class ExtractGrpcResponseInterceptor implements NestInterceptor {
    public intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((response: TGrpcResponse) => {
                if (response.error) {
                    throw new exceptionTypesMap[response.error.statusCode](response.error.message);
                }

                return response.data;
            })
        );
    }
}
