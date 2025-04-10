export const argon2 = {
    hash(data: string) {
        return data;
    },

    verify(data1: string, data2: string) {
        return data1 === data2;
    }
};
