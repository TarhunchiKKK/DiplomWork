import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
    UsersServiceClient,
    USERS_PACKAGE_NAME,
    USERS_SERVICE_NAME,
    IRegisterAdminDto,
    IInviteUsersDto,
    IConfirmInvitationDto,
    ILoginDto,
    IResetPasswordDto,
    IUpdatePasswordDto,
    IActivateAccountDto,
    IDeactivateAccountDto,
    IRefreshProfileDto
} from "common/grpc";
import { BaseGrpcService } from "../base.grpc-service";

@Injectable()
export class UsersGrpcService extends BaseGrpcService<UsersServiceClient> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, USERS_SERVICE_NAME);
    }

    public registerAdmin(dto: IRegisterAdminDto) {
        return this.serviceClient.registerAdmin(dto);
    }

    public login(dto: ILoginDto) {
        return this.serviceClient.login(dto);
    }

    public refreshProfile(dto: IRefreshProfileDto) {
        return this.serviceClient.refreshProfile(dto);
    }

    public sendInvitations(dto: IInviteUsersDto) {
        return this.serviceClient.inviteUsers(dto);
    }

    public confirmInvitation(dto: IConfirmInvitationDto) {
        return this.serviceClient.confirmInvitation(dto);
    }

    public resetPassword(dto: IResetPasswordDto) {
        return this.serviceClient.resetPassword(dto);
    }

    public updatePassword(dto: IUpdatePasswordDto) {
        return this.serviceClient.updatePassword(dto);
    }

    public activateAccount(dto: IActivateAccountDto) {
        return this.serviceClient.activateAccount(dto);
    }

    public deactivateAccount(dto: IDeactivateAccountDto) {
        return this.serviceClient.deactivateAccount(dto);
    }
}
