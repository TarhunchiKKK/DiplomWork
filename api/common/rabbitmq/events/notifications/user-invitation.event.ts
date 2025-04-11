import { BaseRmqEvent } from "../base-rmq-event";

export class UserInvitationEvent extends BaseRmqEvent {
    public static PATTERN = "USER_INVITATION";

    public constructor(
        public from: string,
        public to: string,
        public token: string
    ) {
        super(UserInvitationEvent.PATTERN, {
            from,
            to,
            token
        });
    }
}
