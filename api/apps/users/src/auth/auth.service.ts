import { BadRequestException, Injectable } from "@nestjs/common";
import { IAuthResponse, ILoginDto, IRefreshProfileDto, IRegisterAdminDto, OrganizationsGrpcService } from "common/grpc";
import { AccountStatus, Role } from "common/enums";
import { firstValueFrom } from "rxjs";
import { JwtTokensService } from "common/modules";
import { UsersService } from "../users/users.service";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly organizationsGrpcService: OrganizationsGrpcService,

        private readonly tokensService: JwtTokensService
    ) {}

    public async registerAdmin(dto: IRegisterAdminDto): Promise<IAuthResponse> {
        const organization = await firstValueFrom(this.organizationsGrpcService.createDefault());

        const user = await this.usersService.create({
            ...dto,
            organizationId: organization._id,
            role: Role.ADMIN,
            status: AccountStatus.ACTIVE
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: organization._id,
            token: this.tokensService.create({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
                organizationId: organization._id
            })
        };
    }

    public async login(dto: ILoginDto): Promise<IAuthResponse> {
        const user = await this.usersService.findOneByLogin(dto.login);

        if (!argon2.verify(dto.login, user.password)) {
            throw new BadRequestException("Неверный пароль.");
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            token: this.tokensService.create({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
                organizationId: user.organizationId
            })
        };
    }

    public async refreshProfile(dto: IRefreshProfileDto) {
        const user = await this.usersService.findOneById(dto.userId);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            token: this.tokensService.create({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
                organizationId: user.organizationId
            })
        };
    }
}
