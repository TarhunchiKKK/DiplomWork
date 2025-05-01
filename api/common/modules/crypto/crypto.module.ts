import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AsymmetricEncryptionService } from "./services/asymmetric-encrypting.service";
import { HmacService } from "./services/hmac.service";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [AsymmetricEncryptionService, HmacService],
    exports: [AsymmetricEncryptionService, HmacService]
})
export class CryptoModule {}
