import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationGrpcModule } from "common/grpc";

@Module({
    imports: [AuthenticationGrpcModule],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
