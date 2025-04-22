export class PasswordResetedEvent {
    public static PATTERN = "password.reseted";

    public constructor(
        public userId: string,

        public token: string
    ) {}
}
