import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../base.grpc-service";
import {
    IUserInvitationDto,
    NOTIFICATIONS_PACKAGE_NAME,
    NOTIFICATIONS_SERVICE_NAME,
    NotificationsServiceClient
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class NotificationsGrpcService extends BaseGrpcService<NotificationsServiceClient> {
    public constructor(@Inject(NOTIFICATIONS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, NOTIFICATIONS_SERVICE_NAME);
    }

    public userInvitation(dto: IUserInvitationDto) {
        return this.serviceClient.userInvitation(dto);
    }
}
