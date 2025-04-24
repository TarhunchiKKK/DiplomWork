import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DocumentsGrpcService, UsersGrpcService } from "common/grpc";
import { ParticipantsCreatedEvent } from "./events/participants-created.event";

@Injectable()
export class WorkflowParticipantsObserver {
    public constructor(
        private readonly usersGrpcService: UsersGrpcService,

        private readonly documentsGrpcService: DocumentsGrpcService
    ) {}

    @OnEvent(ParticipantsCreatedEvent.PATTERN)
    public handleParticipantsCreated(event: ParticipantsCreatedEvent) {}
}
