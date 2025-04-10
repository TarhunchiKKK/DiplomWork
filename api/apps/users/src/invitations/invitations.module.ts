import { Module } from "@nestjs/common";
import { JwtTokensModule, UserInvitationTokensModule } from "common/modules";
import { NotificationsRmqModule } from "common/rabbitmq";
import { UsersModule } from "../users/users.module";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";

@Module({
    imports: [NotificationsRmqModule, JwtTokensModule, UserInvitationTokensModule, UsersModule],
    controllers: [InvitationsController],
    providers: [InvitationsService]
})
export class InvitationsModule {}
