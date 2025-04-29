import { Module } from "@nestjs/common";
import { NotificationsGrpcModule } from "common/grpc";
import { NotificationsController } from "./notifications.controller";
import { JwtTokensModule } from "common/modules";

@Module({
    imports: [NotificationsGrpcModule, JwtTokensModule],
    controllers: [NotificationsController]
})
export class NotificationsModule {}
