import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { TotpAuthenticationController } from "./totp-authentication.controller";
import { TotpAuthenticationService } from "./totp-authentication.service";
import { AuthenticationModule } from "../authentiation/authentiation.module";

@Module({
    imports: [UsersModule, AuthenticationModule],
    controllers: [TotpAuthenticationController],
    providers: [TotpAuthenticationService]
})
export class TotpAuthenticationModule {}
