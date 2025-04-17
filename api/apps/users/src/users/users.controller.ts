import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcExceptionFilter, WrapGrpcResponseInterceptor } from "common/grpc";

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class UsersController {}
