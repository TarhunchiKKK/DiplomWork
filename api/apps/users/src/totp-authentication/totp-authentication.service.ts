import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IEnableTotpDto, IGenerateTotpDto, ILoginWithTotpDto } from "common/grpc";
import { generateTotpSecret } from "./helpers/encoding.helpers";
import { ConfigService } from "@nestjs/config";
import { ICreateTotpInstanceDto } from "./interfaces/create-totp-instance.dto";
import { TOTP } from "otpauth";
import { createQrCodeFromTotp } from "./helpers/qr-code.helpers";
import { IValidateTotpDto } from "./interfaces/validate-totp.dto";
import { AuthType } from "common/enums";
import { AuthenticationService } from "../authentiation/authentiation.service";

@Injectable()
export class TotpAuthenticationService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly authenticationService: AuthenticationService,

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

    private validateTotp(dto: IValidateTotpDto) {
        const totp = this.createTotpInstance({ label: dto.label, secret: dto.secret });

        const delta = totp.validate({ token: dto.pin });

        if (delta === null) {
            throw new BadRequestException("Неверный TOTP-код");
        }
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

    public async enable(dto: IEnableTotpDto) {
        this.validateTotp({
            label: dto.userEmail,
            secret: dto.secret,
            pin: dto.pin
        });

        await this.usersService.update(dto.userId, {
            authType: AuthType.TOTP,
            totpSecret: dto.secret
        });
    }

    public async disable(userId: string) {
        await this.usersService.update(userId, {
            authType: AuthType.BASIC,
            totpSecret: null
        });
    }

    public async login(dto: ILoginWithTotpDto) {
        const user = await this.usersService.findOneById(dto.userId);

        this.validateTotp({
            label: dto.userEmail,
            secret: user.totpSecret,
            pin: dto.pin
        });

        return this.authenticationService.createAuthResponse(user);
    }
}
