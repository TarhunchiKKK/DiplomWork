import { TUserInfo } from "@/entities/users";

export function getContent(data: Pick<TUserInfo, "username" | "email">) {
    // return data.username ?? data.username;

    return data.email;
}
