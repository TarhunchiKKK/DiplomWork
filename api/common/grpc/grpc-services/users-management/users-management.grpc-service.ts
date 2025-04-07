import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    UsersManagementServiceClient,
    USERS_MANAGEMENT_PACKAGE_NAME,
    USERS_MANAGEMENT_SERVICE_NAME,
    ICreateUserDto
} from "common/grpc/generated";
import { BaseGrpcService } from "../base.grpc-service";
import { InviteUsersDto } from "apps/users-management-microservice/src/users/dto/invite-users.dto";

@Injectable()
export class UsersManagementGrpcService extends BaseGrpcService<UsersManagementServiceClient> {
    public constructor(@Inject(USERS_MANAGEMENT_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, USERS_MANAGEMENT_SERVICE_NAME);
    }

    public create(dto: ICreateUserDto) {
        return this.serviceClient.create(dto);
    }

    public sendInvitations(dto: InviteUsersDto) {
        return this.serviceClient.inviteUsers(dto);
    }
}
