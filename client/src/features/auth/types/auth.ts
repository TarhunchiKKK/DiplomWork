import { TProfile } from "./profile";

export type TAuthResponse = TProfile & {
    token: string;
};
