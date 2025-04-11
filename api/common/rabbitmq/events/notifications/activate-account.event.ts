import { BaseRmqEvent } from "../base-rmq-event";

export class ActivateAccountEvent extends BaseRmqEvent {
    public static PATTERN = "ACCOUNT_ACTIVATION";

    public constructor(email: string) {
        super(ActivateAccountEvent.PATTERN, { email });
    }
}
