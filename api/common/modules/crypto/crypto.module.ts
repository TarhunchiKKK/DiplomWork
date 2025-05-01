import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AsymmetricEncryptionService } from "./services/asymmetric-encrypting.service";

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [AsymmetricEncryptionService],
    exports: [AsymmetricEncryptionService]
})
export class CryptoModule {}
