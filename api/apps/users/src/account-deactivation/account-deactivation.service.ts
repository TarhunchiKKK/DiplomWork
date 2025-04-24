import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IOnlyId } from "common/grpc";
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

    public async activate(dto: IOnlyId) {
        await this.usersService.update(dto.id, {
            status: AccountStatus.ACTIVE
        });

        this.eventEmitter.emit(AccountActivatedEvent.PATTERN, new AccountActivatedEvent(dto.id));
    }

    public async deactivate(dto: IOnlyId) {
        await this.usersService.update(dto.id, {
            status: AccountStatus.DEACTIVATED
        });

        this.eventEmitter.emit(AccountDeactivatedEvent.PATTERN, new AccountDeactivatedEvent(dto.id));
    }
}
