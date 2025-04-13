import { Controller } from "@nestjs/common";
import {
    IDisableTotpDto,
    IEnableTotpDto,
    IGenerateTotpDto,
    ILoginWithTotpDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { TotpService } from "./totp.service";
import { UnknownReturnTypes } from "common/utils";

type ServiceController = Pick<UsersServiceController, "generateTotp" | "enableTotp" | "disableTotp" | "loginWithTotp">;

@Controller()
@UsersServiceControllerMethods()
export class TotpController implements UnknownReturnTypes<ServiceController> {
    public constructor(private readonly totpService: TotpService) {}

    public async generateTotp(dto: IGenerateTotpDto) {
        return await this.totpService.generate(dto);
    }

    public async enableTotp(dto: IEnableTotpDto) {
        await this.totpService.enable(dto);
    }

    public async disableTotp(dto: IDisableTotpDto) {
        await this.totpService.disable(dto);
    }

    public async loginWithTotp(dto: ILoginWithTotpDto) {
        return await this.totpService.login(dto);
    }
}
