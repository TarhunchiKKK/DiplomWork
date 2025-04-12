import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OrganizationsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";
import { TotpModule } from "./totp/totp.module";

@Module({
    imports: [JwtTokensModule, UsersModule, OrganizationsGrpcModule, TotpModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
