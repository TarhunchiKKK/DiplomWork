import { BaseRmqEvent } from "../base-rmq-event";

export class AccountDeactivatedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "account.deactivated";

    public constructor(email: string) {
        super(AccountDeactivatedRmqEvent.PATTERN, { email });
    }
}
