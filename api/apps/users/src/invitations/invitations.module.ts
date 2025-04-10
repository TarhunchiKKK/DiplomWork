import { Module } from "@nestjs/common";
import { TokensModule } from "common/modules";
import { NotificationsRmqModule } from "common/rabbitmq";
import { UsersModule } from "../users/users.module";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";

@Module({
    imports: [NotificationsRmqModule, TokensModule, UsersModule],
    controllers: [InvitationsController],
    providers: [InvitationsService]
})
export class InvitationsModule {}
