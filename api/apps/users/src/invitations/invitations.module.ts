import { Module } from "@nestjs/common";
import { UserInvitationTokensModule } from "common/modules";
import { NotificationsRmqModule } from "common/rabbitmq";
import { UsersModule } from "../users/users.module";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [NotificationsRmqModule, UserInvitationTokensModule, UsersModule, AuthModule],
    controllers: [InvitationsController],
    providers: [InvitationsService]
})
export class InvitationsModule {}
