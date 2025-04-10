import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OrganizationsGrpcModule } from "common/grpc";
import { TokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [TokensModule, UsersModule, OrganizationsGrpcModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
