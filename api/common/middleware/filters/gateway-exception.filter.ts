import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { IHttpError } from "common/grpc";

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        const { message, error, statusCode } = exception.getResponse() as IHttpError;

        return {
            message: Array.isArray(message) ? message : [message],
            error,
            statusCode
        };
    }
}
