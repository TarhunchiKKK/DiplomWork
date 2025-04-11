import { BaseRmqEvent } from "../base-rmq-event";

export class ResetPasswordEvent extends BaseRmqEvent {
    public static PATTERN = "RESET_PASSWORD";

    public constructor(email: string, token: string) {
        super(ResetPasswordEvent.PATTERN, {
            email,
            token
        });
    }
}
