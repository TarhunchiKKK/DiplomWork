import { BadRequestException, Injectable } from "@nestjs/common";
import { IAuthResponse, ILoginDto, IRegisterAdminDto, OrganizationsGrpcService } from "common/grpc";
import { Role } from "common/enums";
import { firstValueFrom } from "rxjs";
import { JwtTokensService } from "common/modules";
import { UsersService } from "../users/users.service";
import { argon2 } from "./mocks";

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
            password: argon2.hash(dto.password),
            organizationId: organization._id,
            role: Role.ADMIN
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: organization._id,
            token: this.tokensService.create({
                id: user.id,
                username: user.username as string,
                email: user.email,
                role: user.role as Role,
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
                username: user.username as string,
                email: user.email,
                role: user.role as Role,
                organizationId: user.organizationId
            })
        };
    }
}
