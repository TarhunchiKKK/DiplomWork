export type DateFieldsToString<T> = {
    [Key in keyof T]: T[Key] extends Date ? string : T[Key];
};

export type TMutationOptions<T> = {
    onSuccess?: (_: T | undefined) => void;
};

export type TQueryOptions = {
    enabled?: boolean;
};
