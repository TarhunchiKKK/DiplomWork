import { generate } from "randomstring";

const tempIdLength = 8;

export const generateTempId = () => {
    return generate(tempIdLength);
};

export type TWithTempId<T> = T & { tempId: string };

export const addTempId = <T extends Record<string, unknown>>(data: T): TWithTempId<T> => {
    return {
        ...data,
        tempId: generateTempId()
    };
};

export const removeTempId = <T extends { tempId?: string }>(data: T) => {
    const copy = { ...data };

    delete copy.tempId;

    return copy;
};
