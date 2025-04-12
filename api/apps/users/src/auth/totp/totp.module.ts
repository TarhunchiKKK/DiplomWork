import { Module } from "@nestjs/common";
import { UsersModule } from "../../users/users.module";
import { TotpController } from "./totp.controller";
import { TotpService } from "./totp.service";

@Module({
    imports: [UsersModule],
    controllers: [TotpController],
    providers: [TotpService]
})
export class TotpModule {}
