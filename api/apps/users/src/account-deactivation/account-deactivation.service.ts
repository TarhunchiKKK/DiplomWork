import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AccountStatus } from "common/enums";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AccountActivatedEvent } from "./events/account-activated.event";
import { AccountDeactivatedEvent } from "./events/account-deactivated.event";
import { IChangeAccountStatusDto } from "common/grpc";

@Injectable()
export class AccountDeactivationService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly eventEmitter: EventEmitter2
    ) {}

    public async changeStatus(dto: IChangeAccountStatusDto) {
        await this.usersService.update(dto.id, {
            status: dto.status as AccountStatus
        });

        if (dto.status === AccountStatus.ACTIVE) {
            this.eventEmitter.emit(AccountActivatedEvent.PATTERN, new AccountActivatedEvent(dto.id));
        } else {
            this.eventEmitter.emit(AccountDeactivatedEvent.PATTERN, new AccountDeactivatedEvent(dto.id));
        }
    }
}
