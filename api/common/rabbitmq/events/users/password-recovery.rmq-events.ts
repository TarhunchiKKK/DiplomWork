import { IRmqEvent } from "../interfaces";

export class PasswordResetedRmqEvent implements IRmqEvent {
    public static PATTERN = "password.reseted";

    public constructor(
        public email: string,

        public token: string
    ) {}
}
