export class UsersInvitedEvent {
    public static PATTERN = "user.invited";

    public constructor(
        public usersIds: string[],

        public adminEmail: string
    ) {}
}
