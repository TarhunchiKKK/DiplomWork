import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { NotificationsRmqModule } from "common/rabbitmq";
import { UserInvitationTokensModule } from "common/modules";
import { UserEventsObserver } from "./user-events.observer";

@Module({
    imports: [UsersModule, NotificationsRmqModule, UserInvitationTokensModule],
    providers: [UserEventsObserver]
})
export class UserEventsModule {}
