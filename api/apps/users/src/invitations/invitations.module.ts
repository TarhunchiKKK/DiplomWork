import { Module } from "@nestjs/common";
import { UserInvitationTokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import { AuthenticationModule } from "../authentiation/authentiation.module";
import { UserInvitationEventsObserver } from "./user-invitation-events.observer";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [UserInvitationTokensModule, UsersModule, AuthenticationModule, NotificationsRmqModule],
    controllers: [InvitationsController],
    providers: [InvitationsService, UserInvitationEventsObserver]
})
export class InvitationsModule {}
