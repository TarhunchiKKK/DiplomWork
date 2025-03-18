import { Injectable } from "@nestjs/common";
import { IRegisterAdminDto } from "common/grpc";
import { UsersManagementGrpcService } from "../grpc/users-management/users-management.grpc-service";
import { Role } from "common/enums";
import { OrganizationsManagementGrpcService } from "../grpc/organizations-management/organizations-management.grpc-service";
import { allObservables } from "common/utils";

@Injectable()
export class AuthenticationService {
    public constructor(
        private readonly usersManagementGrpcService: UsersManagementGrpcService,
        private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService
    ) {}

    public async registerAdmin(dto: IRegisterAdminDto) {
        const [user, organization] = await allObservables(
            this.usersManagementGrpcService.create({
                ...dto,
                organizationId: "1",
                role: Role.ADMIN
            }),
            this.organizationsManagementGrpcService.createDefault()
        );

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: organization._id,
            token: "token"
        };
    }
}
