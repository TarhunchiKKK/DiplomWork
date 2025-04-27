import { Module } from "@nestjs/common";
import { AccountDeactivationController } from "./account-deactivation.controller";
import { AccountDeactivationService } from "./account-deactivation.service";
import { UsersModule } from "../users/users.module";
import { AccountDeactivationEventsObserver } from "./account-deactivation-events.observer";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [UsersModule, NotificationsRmqModule],
    controllers: [AccountDeactivationController],
    providers: [AccountDeactivationService, AccountDeactivationEventsObserver]
})
export class AccountDeactivationModule {}
