import { Injectable } from "@nestjs/common";
import { IRegisterAdminDto, OrganizationsManagementGrpcService, UsersManagementGrpcService } from "common/grpc";
import { Role } from "common/enums";
import { firstValueFrom } from "rxjs";
import { TokensService } from "common/modules";

@Injectable()
export class AuthenticationService {
    public constructor(
        private readonly usersManagementGrpcService: UsersManagementGrpcService,

        private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService,

        private readonly tokensService: TokensService
    ) {}

    public async registerAdmin(dto: IRegisterAdminDto) {
        const organization = await firstValueFrom(this.organizationsManagementGrpcService.createDefault());

        const user = await firstValueFrom(
            this.usersManagementGrpcService.create({
                ...dto,
                organizationId: organization._id,
                role: Role.ADMIN
            })
        );

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: organization._id,
            token: this.tokensService.jwt.create({
                id: user.id,
                email: user.email,
                role: user.role as Role,
                organizationId: organization._id
            })
        };
    }
}
