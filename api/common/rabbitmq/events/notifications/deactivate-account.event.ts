export class DeactivateAccountEvent {
    public static PATTERN = "ACCOUNT_DEACTIVATION";

    public constructor(public readonly email: string) {}
}
