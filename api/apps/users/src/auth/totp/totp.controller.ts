import { Controller } from "@nestjs/common";
import {
    IDisableTotpDto,
    IEnableTotpDto,
    IGenerateTotpDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { TotpService } from "./totp.service";

type ServiceController = Pick<UsersServiceController, "generateTotp" | "enableTotp" | "disableTotp">;

@Controller()
@UsersServiceControllerMethods()
export class TotpController implements ServiceController {
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
}
