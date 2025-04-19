import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    ACCOUNT_DEACTIVATION_SERVICE_NAME,
    AccountDeactivationServiceClient,
    USERS_PACKAGE_NAME
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AccountDeactivationGrpcService extends BaseGrpcService<OnlyMethods<AccountDeactivationServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, ACCOUNT_DEACTIVATION_SERVICE_NAME);
    }
}
