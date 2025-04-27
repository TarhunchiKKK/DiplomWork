import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AccountStatus } from "common/enums";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AccountActivatedEvent } from "../events/events/account-activated.event";
import { AccountDeactivatedEvent } from "../events/events/account-deactivated.event";

@Injectable()
export class AccountDeactivationService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly eventEmitter: EventEmitter2
    ) {}

    public async activate(userId: string) {
        await this.usersService.update(userId, {
            status: AccountStatus.ACTIVE
        });

        this.eventEmitter.emit(AccountActivatedEvent.PATTERN, new AccountActivatedEvent(userId));
    }

    public async deactivate(userId: string) {
        await this.usersService.update(userId, {
            status: AccountStatus.DEACTIVATED
        });

        this.eventEmitter.emit(AccountDeactivatedEvent.PATTERN, new AccountDeactivatedEvent(userId));
    }
}
