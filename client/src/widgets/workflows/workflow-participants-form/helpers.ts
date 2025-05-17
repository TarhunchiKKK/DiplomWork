import { TUserInfo } from "@/entities/users";

export function getContent(data: Pick<TUserInfo, "username" | "email"> | undefined) {
    if (!data) {
        return undefined;
    }

    return data.username ?? data.username;
}
