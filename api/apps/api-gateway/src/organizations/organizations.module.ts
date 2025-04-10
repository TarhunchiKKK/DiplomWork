import { Module } from "@nestjs/common";
import { OrganizationsGrpcModule } from "common/grpc";
import { OrganizationsController } from "./organizations.controller";
import { JwtTokensModule } from "common/modules";

@Module({
    imports: [JwtTokensModule, OrganizationsGrpcModule],
    controllers: [OrganizationsController]
})
export class OrganizationsModule {}
