import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../base";
import { WORKFLOWS_PACKAGE_NAME, WORKFLOWS_SERVICE_NAME, WorkflowsServiceClient } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";
import { OnlyMethods } from "common/utils";

@Injectable()
export class WorkflowsGrpcService extends BaseGrpcService<OnlyMethods<WorkflowsServiceClient>> {
    public constructor(@Inject(WORKFLOWS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, WORKFLOWS_SERVICE_NAME);
    }
}
