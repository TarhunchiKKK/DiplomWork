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
