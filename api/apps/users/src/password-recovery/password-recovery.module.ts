import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { PasswordRecoveryTokensModule } from "common/modules";
import { PasswordRecoveryService } from "./password-recovery.service";
import { PasswordRecoveryController } from "./password-recovery.controller";
import { RmqModule } from "common/rabbitmq";

@Module({
    imports: [UsersModule, PasswordRecoveryTokensModule, RmqModule],
    controllers: [PasswordRecoveryController],
    providers: [PasswordRecoveryService]
})
export class PasswordRecoveryModule {}
