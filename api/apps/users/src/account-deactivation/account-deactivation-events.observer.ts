import { Injectable } from "@nestjs/common";
import { AccountActivatedRmqEvent, AccountDeactivatedRmqEvent, RmqClient } from "common/rabbitmq";
import { UsersService } from "../users/users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { AccountActivatedEvent } from "./events/account-activated.event";
import { AccountDeactivatedEvent } from "./events/account-deactivated.event";

@Injectable()
export class AccountDeactivationEventsObserver {
    public constructor(
        private readonly usersService: UsersService,

        private readonly rmqClient: RmqClient
    ) {}

    @OnEvent(AccountActivatedEvent.PATTERN)
    public async handleAccountActivated(event: AccountActivatedEvent) {
        const user = await this.usersService.findOneById(event.userId);

        this.rmqClient.emit(new AccountActivatedRmqEvent(user.email));
    }

    @OnEvent(AccountDeactivatedEvent.PATTERN)
    public async handleAccountDeactivated(event: AccountDeactivatedEvent) {
        const user = await this.usersService.findOneById(event.userId);

        this.rmqClient.emit(new AccountDeactivatedRmqEvent(user.email));
    }
}
