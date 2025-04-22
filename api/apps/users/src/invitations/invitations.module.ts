import { Module } from "@nestjs/common";
import { UserInvitationTokensModule } from "common/modules";
import { UsersModule } from "../users/users.module";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import { AuthenticationModule } from "../authentiation/authentiation.module";

@Module({
    imports: [UserInvitationTokensModule, UsersModule, AuthenticationModule],
    controllers: [InvitationsController],
    providers: [InvitationsService]
})
export class InvitationsModule {}
