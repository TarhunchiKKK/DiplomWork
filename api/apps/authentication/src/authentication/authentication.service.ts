import { Injectable } from "@nestjs/common";
import { IRegisterAdminDto, OrganizationsGrpcService, UsersGrpcService } from "common/grpc";
import { Role } from "common/enums";
import { firstValueFrom } from "rxjs";
import { TokensService } from "common/modules";

@Injectable()
export class AuthenticationService {
    public constructor(
        private readonly usersGrpcService: UsersGrpcService,

        private readonly organizationsGrpcService: OrganizationsGrpcService,

        private readonly tokensService: TokensService
    ) {}

    public async registerAdmin(dto: IRegisterAdminDto) {
        const organization = await firstValueFrom(this.organizationsGrpcService.createDefault());

        const user = await firstValueFrom(
            this.usersGrpcService.create({
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
