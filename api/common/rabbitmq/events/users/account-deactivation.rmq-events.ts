import { IRmqEvent } from "../interfaces";

export class AccountActivatedRmqEvent implements IRmqEvent {
    public static PATTERN = "account.activated";

    public constructor(public email: string) {}
}

export class AccountDeactivatedRmqEvent implements IRmqEvent {
    public static PATTERN = "account.deactivated";

    public constructor(public email: string) {}
}
