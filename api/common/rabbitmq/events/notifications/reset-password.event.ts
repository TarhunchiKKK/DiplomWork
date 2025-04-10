export class ResetPasswordEvent {
    public static PATTERN = "reset_password";

    public constructor(
        public email: string,
        public token: string
    ) {}
}
