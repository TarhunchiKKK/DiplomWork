import { Module } from "@nestjs/common";
import { OrganizationsGrpcModule } from "common/grpc";
import { OrganizationsController } from "./organizations.controller";
import { TokensModule } from "common/modules";

@Module({
    imports: [TokensModule, OrganizationsGrpcModule],
    controllers: [OrganizationsController]
})
export class OrganizationsModule {}
