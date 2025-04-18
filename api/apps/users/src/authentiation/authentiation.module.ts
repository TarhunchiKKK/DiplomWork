import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentiation.controller";
import { AuthenticationService } from "./authentiation.service";
import { OrganizationsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [JwtTokensModule, UsersModule, OrganizationsGrpcModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})
export class AuthenticationModule {}
