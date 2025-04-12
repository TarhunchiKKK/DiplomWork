import { Controller } from "@nestjs/common";
import { IGenerateTotpDto, UsersServiceController, UsersServiceControllerMethods } from "common/grpc";
import { TotpService } from "./totp.service";

type ServiceController = Pick<UsersServiceController, "generateTotp">;

@Controller()
@UsersServiceControllerMethods()
export class TotpController implements ServiceController {
    public constructor(private readonly totpService: TotpService) {}

    public async generateTotp(dto: IGenerateTotpDto) {
        return await this.totpService.generate(dto);
    }
}
