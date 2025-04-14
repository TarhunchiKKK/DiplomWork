export function asType<T>(value: unknown) {
    return value as unknown as T;
}

export type UnknownReturnTypes<T extends object> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? (...args: Parameters<T[K]>) => unknown : T[K];
};

export type OnlyMethods<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends (_: unknown) => unknown ? T[K] : never;
};
