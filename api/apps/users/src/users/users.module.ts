import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { JwtTokensModule, PasswordRecoveryTokensModule, UserInvitationTokensModule } from "common/modules";
import { RmqModule } from "common/rabbitmq";
import { UsersController } from "./users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtTokensModule,
        UserInvitationTokensModule,
        PasswordRecoveryTokensModule,
        RmqModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
