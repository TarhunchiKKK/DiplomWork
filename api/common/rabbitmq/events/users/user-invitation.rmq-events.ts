import { IRmqEvent } from "../interfaces";

export class UserInvitedRqmEvent implements IRmqEvent {
    public static PATTERN = "user.invited";

    public pattern = UserInvitedRqmEvent.PATTERN;

    public constructor(
        public from: string,

        public to: string,

        public token: string
    ) {}
}
