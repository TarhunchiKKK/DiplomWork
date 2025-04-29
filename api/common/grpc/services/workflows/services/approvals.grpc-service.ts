import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import { APPROVALS_SERVICE_NAME, ApprovalsServiceClient, WORKFLOWS_PACKAGE_NAME } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class ApprovalsGrpcService extends BaseGrpcService<OnlyMethods<ApprovalsServiceClient>> {
    public constructor(@Inject(WORKFLOWS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, APPROVALS_SERVICE_NAME);
    }
}
