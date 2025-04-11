import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { NotificationsRmqService, ResetPasswordEvent } from "common/rabbitmq";
import { PasswordRecoveryTokensService } from "common/modules";
import { IUpdatePasswordDto } from "common/grpc";

@Injectable()
export class PasswordRecoveryService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly notificationsRmqService: NotificationsRmqService,

        private readonly tokensService: PasswordRecoveryTokensService
    ) {}

    public async reset(userId: string) {
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("Пользователь не найден");
        }

        const token = this.tokensService.create({
            id: user.id,
            email: user.email,
            password: user.password
        });

        this.notificationsRmqService.emit(new ResetPasswordEvent(user.email, token));
    }

    public async update(dto: IUpdatePasswordDto) {
        const { id } = this.tokensService.verify(dto.token);

        await this.usersService.update(id, {
            password: dto.password
        });
    }
}
