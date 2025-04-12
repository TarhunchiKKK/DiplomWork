import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OrganizationsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [JwtTokensModule, UsersModule, OrganizationsGrpcModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
