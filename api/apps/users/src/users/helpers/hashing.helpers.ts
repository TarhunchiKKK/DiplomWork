import * as argon2 from "argon2";

export async function withHashedPassword<T extends { password?: string }>(data: T): Promise<T> {
    if (!data.password) {
        return data;
    }

    return {
        ...data,
        password: await argon2.hash(data.password)
    };
}
