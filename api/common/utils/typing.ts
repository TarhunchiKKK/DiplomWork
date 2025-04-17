import { Observable } from "rxjs";

export function asType<T>(value: unknown) {
    return value as unknown as T;
}

export type OnlyMethods<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends (_: unknown) => unknown ? T[K] : never;
};

export type Observed<T> = T extends Observable<infer U> ? U : T;

export type IgnoreFields<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
