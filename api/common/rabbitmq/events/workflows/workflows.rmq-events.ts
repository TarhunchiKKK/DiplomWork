import { IReceiverData, type IRmqEvent } from "../interfaces";

export class WorkflowDeletedRmqEvent implements IRmqEvent {
    public static PATTERN = "workflow.deleted";

    public constructor(
        public documentTitle: string,

        public participant: IReceiverData
    ) {}
}

export class WorkflowCompletedRmqEvent implements IRmqEvent {
    public static PATTERN = "workflow.completed";

    public constructor(
        public documentTitle: string,

        public creator: IReceiverData
    ) {}
}
