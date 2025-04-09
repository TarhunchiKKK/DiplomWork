export class UserInvitationEvent {
    public static PATTERN = "user_invitation";

    public from: string;

    public to: string;

    public token: string;

    public constructor(from: string, to: string, token: string) {
        this.from = from;
        this.to = to;
        this.token = token;
    }
}
