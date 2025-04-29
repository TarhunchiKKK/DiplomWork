import { BaseRmqEvent, DocumentApprovedRmqEvent, DocumentSignedRmqEvent } from "common/rabbitmq";
import { ApprovalStatus } from "../enums/approval.-status.enum";

export const approvalRmqEventsMap = new Map<ApprovalStatus, new (_: string, __: string, ___: string) => BaseRmqEvent>([
    [ApprovalStatus.APPROVED, DocumentApprovedRmqEvent],
    [ApprovalStatus.SIGNED, DocumentSignedRmqEvent],
    [ApprovalStatus.REJECTED, DocumentSignedRmqEvent]
]);
