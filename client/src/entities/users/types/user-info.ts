import { AccountStatus } from "../enums";

export type TUserInfo = {
    id: string;

    username: string;

    email: string;

    status: AccountStatus;
};
