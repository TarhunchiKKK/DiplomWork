export function firstOrDefault<T, K extends null>(array: T[], defaultValue: K = null) {
    return array[0] ?? defaultValue;
}
