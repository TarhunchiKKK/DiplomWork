import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { AccountActivatedEvent } from "./events/account-activated.event";
import {
    AccountActivatedRmqEvent,
    AccountDeactivatedRmqEvent,
    NotificationsRmqService,
    PasswordResetedRmqEvent,
    UserInvitedRqmEvent
} from "common/rabbitmq";
import { AccountDeactivatedEvent } from "./events/account-deactivated.event";
import { PasswordResetedEvent } from "./events/password-reseted.event";
import { UsersInvitedEvent } from "./events/users-invited.event";
import { UserInvitationTokensService } from "common/modules";

@Injectable()
export class UserEventsObserver {
    public constructor(
        private readonly usersService: UsersService,

        private notificationsRmqService: NotificationsRmqService,

        private invitationTokensService: UserInvitationTokensService
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

    @OnEvent(PasswordResetedEvent.PATTERN)
    public handlePasswordReseted(event: PasswordResetedEvent) {
        this.notificationsRmqService.emit(new PasswordResetedRmqEvent(event.userId, event.token));
    }

    @OnEvent(AccountActivatedEvent.PATTERN)
    public async handleAccountActivated(event: AccountActivatedEvent) {
        const user = await this.usersService.findOneById(event.userId);

        this.notificationsRmqService.emit(new AccountActivatedRmqEvent(user.id));
    }

    @OnEvent(AccountDeactivatedEvent.PATTERN)
    public async handleAccountDeactivated(event: AccountDeactivatedEvent) {
        const user = await this.usersService.findOneById(event.userId);

        this.notificationsRmqService.emit(new AccountDeactivatedRmqEvent(user.id));
    }
}
