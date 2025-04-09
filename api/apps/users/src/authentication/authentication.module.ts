import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { OrganizationsGrpcModule } from "common/grpc";
import { TokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [TokensModule, UsersModule, OrganizationsGrpcModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
