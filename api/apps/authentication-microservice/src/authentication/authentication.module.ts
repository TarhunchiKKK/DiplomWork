import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { OrganizationsManagementGrpcModule, UsersManagementGrpcModule } from "common/grpc";
import { TokensModule } from "common/modules";

@Module({
    imports: [TokensModule, OrganizationsManagementGrpcModule, UsersManagementGrpcModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
