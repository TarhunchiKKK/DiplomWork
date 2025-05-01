import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ApprovalsGrpcService, WorkflowsGrpcService } from "common/grpc";
import { VersionCreatedEvent } from "./events/version-created.evnet";
import { firstValueFrom } from "rxjs";
import { WorkflowStatus } from "apps/workflows/src/workflows/enums/workflow-status.enum";

@Injectable()
export class DocumentVersionsEventsObserver {
    public constructor(
        private readonly workflowsGrpcSerivce: WorkflowsGrpcService,

        private readonly approvalsGrpcService: ApprovalsGrpcService
    ) {}

    @OnEvent(VersionCreatedEvent.pattern)
    public async handleVersionCreated(event: VersionCreatedEvent) {
        const workflow = await firstValueFrom(
            this.workflowsGrpcSerivce.call("findOneByDocumentId", {
                id: event.documentId
            })
        );

        await Promise.all([
            this.workflowsGrpcSerivce.call("update", {
                id: workflow.id,
                stautus: WorkflowStatus.REJECTED
            }),
            this.approvalsGrpcService.call("resetAllByWorkflowId", {
                id: workflow.id
            })
        ]);
    }
}
