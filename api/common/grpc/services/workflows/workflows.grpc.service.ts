import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../base.grpc-service";
import { WORKFLOWS_PACKAGE_NAME, WORKFLOWS_SERVICE_NAME, WorkflowsServiceClient } from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class WorkflowsGrpcService extends BaseGrpcService<WorkflowsServiceClient> {
    public constructor(@Inject(WORKFLOWS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, WORKFLOWS_SERVICE_NAME);
    }
}
