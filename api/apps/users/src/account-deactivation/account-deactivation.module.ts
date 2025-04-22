import { Module } from "@nestjs/common";
import { AccountDeactivationController } from "./account-deactivation.controller";
import { AccountDeactivationService } from "./account-deactivation.service";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [AccountDeactivationController],
    providers: [AccountDeactivationService]
})
export class AccountDeactivationModule {}
