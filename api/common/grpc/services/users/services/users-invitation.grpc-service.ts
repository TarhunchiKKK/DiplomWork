import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import { USERS_INVITATION_SERVICE_NAME, USERS_PACKAGE_NAME, UsersInvitationServiceClient } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class UsersInvitationGrpcService extends BaseGrpcService<OnlyMethods<UsersInvitationServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, USERS_INVITATION_SERVICE_NAME);
    }
}
