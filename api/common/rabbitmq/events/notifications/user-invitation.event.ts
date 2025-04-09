export class UserInvitationEvent {
    public static PATTERN = "user_invitation";

    public constructor(
        public from: string,
        public to: string,
        public token: string
    ) {}
}
