import {
    HttpStatus,
    HttpException,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException
} from "@nestjs/common";

export const exceptionsMap: Map<HttpStatus, new (_: string | string[]) => HttpException> = new Map([
    [HttpStatus.BAD_REQUEST, BadRequestException],
    [HttpStatus.NOT_FOUND, NotFoundException],
    [HttpStatus.UNAUTHORIZED, UnauthorizedException],
    [HttpStatus.INTERNAL_SERVER_ERROR, InternalServerErrorException]
]);
