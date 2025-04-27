import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { NotificationsRmqService, UserInvitedRqmEvent } from "common/rabbitmq";
import { UsersInvitedEvent } from "./events/users-invited.event";
import { UserInvitationTokensService } from "common/modules";

@Injectable()
export class UserInvitationEventsObserver {
    public constructor(
        private readonly usersService: UsersService,

        private readonly notificationsRmqService: NotificationsRmqService,

        private readonly invitationTokensService: UserInvitationTokensService
    ) {}

    @OnEvent(UsersInvitedEvent.PATTERN)
    public async handleUsersInvited(event: UsersInvitedEvent) {
        const users = await this.usersService.findAllByIds(event.usersIds);

        users.forEach(user =>
            this.notificationsRmqService.emit(
                new UserInvitedRqmEvent(event.adminEmail, user.email, this.invitationTokensService.create(user))
            )
        );
    }
}
