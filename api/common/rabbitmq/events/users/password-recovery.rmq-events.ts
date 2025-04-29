import { IRmqEvent } from "../interfaces";

export class PasswordResetedRmqEvent implements IRmqEvent {
    public static PATTERN = "password.reseted";

    public pattern = PasswordResetedRmqEvent.PATTERN;

    public constructor(
        public email: string,

        public token: string
    ) {}
}
