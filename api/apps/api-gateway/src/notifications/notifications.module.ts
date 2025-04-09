import { Module } from "@nestjs/common";
import { NotificationsGrpcModule } from "common/grpc";
import { NotificationsController } from "./notifications.controller";

@Module({
    imports: [NotificationsGrpcModule],
    controllers: [NotificationsController]
})
export class NotificationsModule {}
