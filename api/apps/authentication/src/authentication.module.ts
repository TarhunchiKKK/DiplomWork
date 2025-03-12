import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { ConfigModule } from "@nestjs/config";
import { getConfigModuleConfig } from "common/config";

@Module({
    imports: [ConfigModule.forRoot(getConfigModuleConfig())],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
