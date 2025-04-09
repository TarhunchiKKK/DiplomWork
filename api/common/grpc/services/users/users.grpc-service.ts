import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    UsersServiceClient,
    USERS_PACKAGE_NAME,
    USERS_SERVICE_NAME,
    IRegisterAdminDto,
    ICreateUserDto,
    IInviteUsersDto,
    IConfirmInvitationDto
} from "common/grpc/generated";
import { BaseGrpcService } from "../base.grpc-service";

@Injectable()
export class UsersGrpcService extends BaseGrpcService<UsersServiceClient> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, USERS_SERVICE_NAME);
    }

    public registerAdmin(dto: IRegisterAdminDto) {
        try {
            return this.serviceClient.registerAdmin(dto);
        } catch (error) {
            throw error;
        }
    }

    public create(dto: ICreateUserDto) {
        return this.serviceClient.create(dto);
    }

    public sendInvitations(dto: IInviteUsersDto) {
        return this.serviceClient.inviteUsers(dto);
    }

    public confirmInvitation(dto: IConfirmInvitationDto) {
        return this.serviceClient.confirmInvitation(dto);
    }
}
