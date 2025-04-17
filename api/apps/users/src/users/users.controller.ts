import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcExceptionFilter, InsertGrpcResponseInterceptor } from "common/grpc";

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
export class UsersController {}
