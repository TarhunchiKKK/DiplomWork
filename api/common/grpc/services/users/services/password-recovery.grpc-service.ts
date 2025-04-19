import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    PASSWORD_RECOVERY_SERVICE_NAME,
    PasswordRecoveryServiceClient,
    USERS_PACKAGE_NAME
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class PasswordRecoveryGrpcService extends BaseGrpcService<OnlyMethods<PasswordRecoveryServiceClient>> {
    public constructor(@Inject(USERS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, PASSWORD_RECOVERY_SERVICE_NAME);
    }
}
