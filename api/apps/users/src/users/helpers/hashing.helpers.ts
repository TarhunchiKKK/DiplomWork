import * as argon2 from "argon2";

export function withHashedPassword<T extends { password?: string }>(data: T): T {
    if (!data.password) {
        return data;
    }

    return {
        ...data,
        password: argon2.hash(data.password)
    };
}
