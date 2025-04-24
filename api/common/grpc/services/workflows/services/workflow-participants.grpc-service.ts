import { Inject, Injectable } from "@nestjs/common";
import { BaseGrpcService } from "../../base";
import { OnlyMethods } from "common/utils";
import {
    WORKFLOW_PARTICIPANTS_SERVICE_NAME,
    WorkflowParticipantsServiceClient,
    WORKFLOWS_PACKAGE_NAME
} from "common/grpc/generated";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class WorkflowParticipantsGrpcService extends BaseGrpcService<OnlyMethods<WorkflowParticipantsServiceClient>> {
    public constructor(@Inject(WORKFLOWS_PACKAGE_NAME) clientGrpc: ClientGrpc) {
        super(clientGrpc, WORKFLOW_PARTICIPANTS_SERVICE_NAME);
    }
}
