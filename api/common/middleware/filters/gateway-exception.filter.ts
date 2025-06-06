import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { IHttpError } from "common/grpc";

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        console.log("error in GatewayExceptionFilter: ");
        console.log(exception);

        const { message, error, statusCode } = exception.getResponse() as IHttpError;

        const response = host.switchToHttp().getResponse<Response>();

        response.status(statusCode).json({
            message: Array.isArray(message) ? message : [message],
            error,
            statusCode
        });
    }
}
