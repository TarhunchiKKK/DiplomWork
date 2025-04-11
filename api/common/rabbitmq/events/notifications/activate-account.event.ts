export class ActivateAccountEvent {
    public static PATTERN = "ACCOUNT_ACTIVATION";

    public constructor(public readonly email: string) {}
}
