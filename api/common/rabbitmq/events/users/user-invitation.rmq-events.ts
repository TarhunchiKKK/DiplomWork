import { IRmqEvent } from "../interfaces";

export class UserInvitedRqmEvent implements IRmqEvent {
    public static readonly PATTERN = "user.invited";

    public constructor(
        public from: string,

        public to: string,

        public token: string
    ) {}
}
