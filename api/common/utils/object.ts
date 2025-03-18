export function pick<T extends Record<string, unknown>>(entity: T, keys: (keyof T)[]) {
    return keys.reduce(
        (acc, key) => {
            acc[key] = entity[key];
            return acc;
        },
        {} as Pick<T, keyof T>
    );
}

export function omit<T extends Record<string, unknown>>(entity: T, keys: (keyof T)[]) {
    return Object.keys(entity).reduce(
        (acc, key) => {
            if (!keys.includes(key)) {
                acc[key] = entity[key];
            }
            return acc;
        },
        {} as Omit<T, keyof T>
    );
}
