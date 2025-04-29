import { BaseRmqEvent } from "../base-rmq-event";

export class WorkflowDeletedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "workflow.deleted";

    public constructor(
        public documentTitle: string,
        public userEmail: string
    ) {
        super(WorkflowDeletedRmqEvent.PATTERN, { documentTitle, userEmail });
    }
}

export class WorkflowCompletedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "workflow.completed";

    public constructor(
        public title: string,

        public creatorEmail: string
    ) {
        super(WorkflowCompletedRmqEvent.PATTERN, { title, creatorEmail });
    }
}
