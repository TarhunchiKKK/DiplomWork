import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IActivateAccountDto, IDeactivateAccountDto } from "common/grpc";
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

    public async activate(dto: IActivateAccountDto) {
        await this.usersService.update(dto.userId, {
            status: AccountStatus.ACTIVE
        });

        this.eventEmitter.emit(AccountActivatedEvent.PATTERN, new AccountActivatedEvent(dto.userId));
    }

    public async deactivate(dto: IDeactivateAccountDto) {
        await this.usersService.update(dto.userId, {
            status: AccountStatus.DEACTIVATED
        });

        this.eventEmitter.emit(AccountDeactivatedEvent.PATTERN, new AccountDeactivatedEvent(dto.userId));
    }
}
