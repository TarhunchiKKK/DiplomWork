import { Injectable } from "@nestjs/common";
import { IRegisterAdminDto, OrganizationsManagementGrpcService, UsersManagementGrpcService } from "common/grpc";
import { Role } from "common/enums";
import { firstValueFrom } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { GenerateJwtDto } from "./dto/generate-jwt.dto";

@Injectable()
export class AuthenticationService {
    public constructor(
        private readonly usersManagementGrpcService: UsersManagementGrpcService,

        private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService,

        private readonly jwtService: JwtService
    ) {}

    private generateJwt(dto: GenerateJwtDto) {
        return this.jwtService.sign({
            id: dto.id,
            email: dto.email,
            role: dto.role,
            organizationId: dto.organizationId
        });
    }

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
            token: this.generateJwt({
                id: user.id,
                email: user.email,
                role: user.role as Role,
                organizationId: organization._id
            })
        };
    }
}
