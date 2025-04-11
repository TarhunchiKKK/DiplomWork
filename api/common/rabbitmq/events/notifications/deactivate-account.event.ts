import { BaseRmqEvent } from "../base-rmq-event";

export class DeactivateAccountEvent extends BaseRmqEvent {
    public static PATTERN = "ACCOUNT_DEACTIVATION";

    public constructor(email: string) {
        super(DeactivateAccountEvent.PATTERN, { email });
    }
}
