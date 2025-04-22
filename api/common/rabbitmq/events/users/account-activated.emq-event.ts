import { BaseRmqEvent } from "../base-rmq-event";

export class AccountActivatedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "account.activated";

    public constructor(email: string) {
        super(AccountActivatedRmqEvent.PATTERN, { email });
    }
}
