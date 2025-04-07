import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { OrganizationsGrpcModule, UsersGrpcModule } from "common/grpc";
import { TokensModule } from "common/modules";

@Module({
    imports: [TokensModule, OrganizationsGrpcModule, UsersGrpcModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
