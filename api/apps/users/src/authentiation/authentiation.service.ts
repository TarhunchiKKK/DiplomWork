import { BadRequestException, Injectable } from "@nestjs/common";
import { ILoginDto, IRegisterAdminDto, OrganizationsGrpcService } from "common/grpc";
import { AccountStatus, Role } from "common/enums";
import { firstValueFrom } from "rxjs";
import { JwtTokensService } from "common/modules";
import { UsersService } from "../users/users.service";
import * as argon2 from "argon2";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthenticationService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly organizationsGrpcService: OrganizationsGrpcService,

        private readonly tokensService: JwtTokensService
    ) {}

    public createJwtFromUser(user: User) {
        return this.tokensService.create({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            organizationId: user.organizationId
        });
    }

    public async registerAdmin(dto: IRegisterAdminDto) {
        const organization = await firstValueFrom(this.organizationsGrpcService.call("createDefault", {}));

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
            organizationId: user.organizationId,
            token: this.createJwtFromUser(user)
        };
    }

    public async login(dto: ILoginDto) {
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
            token: user.useBasicAuth ? this.createJwtFromUser(user) : ""
        };
    }

    public async refreshProfile(userId: string) {
        const user = await this.usersService.findOneById(userId);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            token: this.createJwtFromUser(user)
        };
    }
}
