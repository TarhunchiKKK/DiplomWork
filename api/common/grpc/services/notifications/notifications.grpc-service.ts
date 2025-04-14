import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../base";
import {
    NOTIFICATIONS_PACKAGE_NAME,
    NOTIFICATIONS_SERVICE_NAME,
    NotificationsServiceClient
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";
import { OnlyMethods } from "common/utils";

@Injectable()
export class NotificationsGrpcService extends BaseGrpcService<OnlyMethods<NotificationsServiceClient>> {
    public constructor(@Inject(NOTIFICATIONS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, NOTIFICATIONS_SERVICE_NAME);
    }
}
