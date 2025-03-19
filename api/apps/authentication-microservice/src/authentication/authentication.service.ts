import { Injectable } from "@nestjs/common";
import { IRegisterAdminDto } from "common/grpc";
import { UsersManagementGrpcService } from "../grpc/users-management/users-management.grpc-service";
import { Role } from "common/enums";
import { OrganizationsManagementGrpcService } from "../grpc/organizations-management/organizations-management.grpc-service";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthenticationService {
    public constructor(
        private readonly usersManagementGrpcService: UsersManagementGrpcService,
        private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService
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
            organizationId: user.id,
            token: "token"
        };
    }
}
