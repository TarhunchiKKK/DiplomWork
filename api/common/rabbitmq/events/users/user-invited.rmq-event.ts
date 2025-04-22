import { BaseRmqEvent } from "../base-rmq-event";

export class UserInvitedRqmEvent extends BaseRmqEvent {
    public static PATTERN = "user.invited";

    public constructor(
        public from: string,
        public to: string,
        public token: string
    ) {
        super(UserInvitedRqmEvent.PATTERN, {
            from,
            to,
            token
        });
    }
}
