export class AccountDeactivatedEvent {
    public static PATTERN = "account.activated";

    public constructor(public userId: string) {}
}
