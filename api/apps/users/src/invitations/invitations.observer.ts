import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { RmqClient, UserInvitedRqmEvent } from "common/rabbitmq";
import { UsersInvitedEvent } from "./events/users-invited.event";
import { UserInvitationTokensService } from "common/modules";

@Injectable()
export class UserInvitationEventsObserver {
    public constructor(
        private readonly usersService: UsersService,

        private readonly rmqClient: RmqClient,

        private readonly invitationTokensService: UserInvitationTokensService
    ) {}

    @OnEvent(UsersInvitedEvent.PATTERN)
    public async handleUsersInvited(event: UsersInvitedEvent) {
        const users = await this.usersService.findAllByIds(event.usersIds);

        console.log(users);

        users.forEach(user =>
            this.rmqClient.emit(
                new UserInvitedRqmEvent(event.adminEmail, user.email, this.invitationTokensService.create(user))
            )
        );
    }
}
