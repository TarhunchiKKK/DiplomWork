export class AccountActivatedEvent {
    public static PATTERN = "account.activated";

    public constructor(public userId: string) {}
}
