import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { PasswordRecoveryTokensService } from "common/modules";
import { IUpdatePasswordDto } from "common/grpc";
import { RmqClient, PasswordResetedRmqEvent } from "common/rabbitmq";
import * as argon2 from "argon2";

@Injectable()
export class PasswordRecoveryService {
    public constructor(
        private readonly usersService: UsersService,

        private RmqClient: RmqClient,

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

        this.RmqClient.emit(new PasswordResetedRmqEvent(user.email, token));
    }

    public async update(dto: IUpdatePasswordDto) {
        const { id } = this.tokensService.verify(dto.token);

        await this.usersService.update(id, {
            password: await argon2.hash(dto.password)
        });
    }
}
