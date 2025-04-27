import { Injectable } from "@nestjs/common";
import { AccountActivatedRmqEvent, AccountDeactivatedRmqEvent, NotificationsRmqService } from "common/rabbitmq";
import { UsersService } from "../users/users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { AccountActivatedEvent } from "./events/account-activated.event";
import { AccountDeactivatedEvent } from "./events/account-deactivated.event";

@Injectable()
export class AccountDeactivationEventsObserver {
    public constructor(
        private readonly usersService: UsersService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    @OnEvent(AccountActivatedEvent.PATTERN)
    public async handleAccountActivated(event: AccountActivatedEvent) {
        const user = await this.usersService.findOneById(event.userId);

        this.notificationsRmqService.emit(new AccountActivatedRmqEvent(user.email));
    }

    @OnEvent(AccountDeactivatedEvent.PATTERN)
    public async handleAccountDeactivated(event: AccountDeactivatedEvent) {
        const user = await this.usersService.findOneById(event.userId);

        this.notificationsRmqService.emit(new AccountDeactivatedRmqEvent(user.email));
    }
}
