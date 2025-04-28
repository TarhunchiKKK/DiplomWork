import { BaseRmqEvent } from "../base-rmq-event";

export class PasswordResetedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "password.reseted";

    public constructor(email: string, token: string) {
        super(PasswordResetedRmqEvent.PATTERN, {
            email,
            token
        });
    }
}
