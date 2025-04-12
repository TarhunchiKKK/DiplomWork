import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { TotpController } from "./totp.controller";
import { TotpService } from "./totp.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [UsersModule, AuthModule],
    controllers: [TotpController],
    providers: [TotpService]
})
export class TotpModule {}
