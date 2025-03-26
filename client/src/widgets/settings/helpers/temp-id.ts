import { generate } from "randomstring";

const tempIdLength = 8;

const generateTempId = () => {
    return generate(tempIdLength);
};

export type TWithTempId<T> = T & { tempId: string };

export const addTempId = <T extends Record<string, unknown>>(data: T): TWithTempId<T> => {
    return {
        ...data,
        tempId: generateTempId()
    };
};

export const removeTempId = (data: { tempId?: string }) => {
    const copy = { ...data };

    delete data.tempId;

    return data;
};
