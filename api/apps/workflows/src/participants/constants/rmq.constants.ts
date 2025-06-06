import { DocumentApprovedRmqEvent, DocumentRejectedRmqEvent, IReceiverData, IRmqEvent } from "common/rabbitmq";
import { ApprovalStatus } from "../enums/approval.-status.enum";

export const approvalRmqEventsMap = new Map<
    ApprovalStatus,
    new (_: string, __: IReceiverData, ___: string) => IRmqEvent
>([
    [ApprovalStatus.APPROVED, DocumentApprovedRmqEvent],
    [ApprovalStatus.REJECTED, DocumentRejectedRmqEvent]
]);
