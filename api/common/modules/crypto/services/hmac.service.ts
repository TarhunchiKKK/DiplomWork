import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

@Injectable()
export class HmacService {
    private readonly key: string;

    public constructor(private readonly configService: ConfigService) {
        this.key = this.configService.get<string>("HMAC_KEY");
    }

    private create(data: string) {
        return crypto.createHmac("sha256", this.key).update(data).digest("hex");
    }

    public verify(data: string, hmac: string) {
        const dataHmac = this.create(data);
        return dataHmac === hmac;
    }
}
