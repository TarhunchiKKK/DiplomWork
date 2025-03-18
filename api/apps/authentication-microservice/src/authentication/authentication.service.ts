import { Injectable } from "@nestjs/common";
import { AuthResponse, RegisterAdminDto } from "common/grpc";
import { UsersManagementGrpcService } from "../grpc/users-management/users-management.grpc-service";
import { firstValueFrom } from "rxjs";
import { Role } from "common/enums";

@Injectable()
export class AuthenticationService {
    public constructor(private readonly usersManagementGrpcService: UsersManagementGrpcService) {}

    public async registerAdmin(dto: RegisterAdminDto): Promise<AuthResponse> {
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
                isTwoFactorEnabled: false,
                isDeactivated: false,
                post: null
            },
            token: "token"
        };
    }
}
