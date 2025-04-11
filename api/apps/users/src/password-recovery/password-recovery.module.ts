import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { NotificationsRmqModule } from "common/rabbitmq";
import { PasswordRecoveryTokensModule } from "common/modules";
import { PasswordRecoveryService } from "./password-recovery.service";
import { PasswordRecoveryController } from "./password-recovery.controller";

@Module({
    imports: [UsersModule, NotificationsRmqModule, PasswordRecoveryTokensModule],
    controllers: [PasswordRecoveryController],
    providers: [PasswordRecoveryService]
})
export class PasswordRecoveryModule {}
