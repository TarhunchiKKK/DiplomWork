import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ActivateAccountEvent, DeactivateAccountEvent, NotificationsRmqService } from "common/rabbitmq";
import { IActivateAccountDto, IDeactivateAccountDto } from "common/grpc";
import { AccountStatus } from "../users/enums/account-status.enum";

@Injectable()
export class AccountDeactivationService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    public async activateAccount(dto: IActivateAccountDto) {
        await this.usersService.update(dto.userId, {
            status: AccountStatus.ACTIVE
        });

        this.notificationsRmqService.emit(new ActivateAccountEvent(dto.userId));
    }

    public async deactivateAccount(dto: IDeactivateAccountDto) {
        await this.usersService.update(dto.userId, {
            status: AccountStatus.DEACTIVATED
        });

        this.notificationsRmqService.emit(new DeactivateAccountEvent(dto.userId));
    }
}
