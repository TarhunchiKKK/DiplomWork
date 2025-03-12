import { Injectable } from "@nestjs/common";
import { RegisterAdminDto } from "common/grpc";
import { UsersManagementGrpcService } from "./users-management.grpc-service";
import { Role } from "apps/users-management/prisma/generated";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthenticationService {
    public constructor(private readonly usersManagementGrpcService: UsersManagementGrpcService) {}

    public async registerAdmin(dto: RegisterAdminDto) {
        const user = await firstValueFrom(
            this.usersManagementGrpcService.create({
                ...dto,
                organizationId: "1",
                role: Role.ADMIN
            })
        );

        return {
            profile: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                isDeactivated: user.isDeactivated,
                isTwoFactorEnabled: user.isTwoFactorEnabled,
                post: ""
            },
            token: "token"
        };
    }
}
