import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { IGenerateTotpDto } from "common/grpc";
import { generateTotpSecret } from "./helpers/encoding.helpers";
import { ConfigService } from "@nestjs/config";
import { ICreateTotpInstanceDto } from "./dto/create-totp-instance.dto";
import { TOTP } from "otpauth";
import { createQrCodeFromTotp } from "./helpers/qr-code.helpers";

@Injectable()
export class TotpService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly configService: ConfigService
    ) {}

    private createTotpInstance(dto: ICreateTotpInstanceDto) {
        return new TOTP({
            issuer: this.configService.getOrThrow<string>("TOTP_ISSUER"),
            algorithm: this.configService.getOrThrow<string>("TOTP_ALGORITHM"),
            digits: this.configService.getOrThrow<number>("TOTP_DIGITS"),
            label: dto.label,
            secret: dto.secret
        });
    }

    public async generate(dto: IGenerateTotpDto) {
        const secret = generateTotpSecret();

        const totp = this.createTotpInstance({
            label: dto.userEmail,
            secret: secret
        });

        const qrCode = await createQrCodeFromTotp(totp);

        return { qrCode, secret };
    }
}
