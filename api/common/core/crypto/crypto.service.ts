import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class CryptoService {
    private readonly passphrase: string;

    public constructor(private readonly configService: ConfigService) {
        this.passphrase = this.configService.getOrThrow<string>("CRYPTO_PASSPHRASE");
    }

    public generateAssymetricKeys() {
        return crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase: this.passphrase
            }
        });
    }
}
