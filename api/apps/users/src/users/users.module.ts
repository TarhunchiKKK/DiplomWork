import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import {
    CryptoModule,
    JwtTokensModule,
    PasswordRecoveryTokensModule,
    UserInvitationTokensModule
} from "common/modules";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CryptoModule,
        JwtTokensModule,
        UserInvitationTokensModule,
        PasswordRecoveryTokensModule,
        NotificationsRmqModule
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
