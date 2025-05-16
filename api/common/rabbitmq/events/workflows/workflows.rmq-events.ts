import { IReceiverData, type IRmqEvent } from "../interfaces";

export class WorkflowDeletedRmqEvent implements IRmqEvent {
    public static PATTERN = "workflow.deleted";

    public pattern = WorkflowDeletedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public participant: IReceiverData
    ) {}
}

export class WorkflowCompletedRmqEvent implements IRmqEvent {
    public static PATTERN = "workflow.completed";

    public pattern = WorkflowCompletedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public creator: IReceiverData
    ) {}
}
