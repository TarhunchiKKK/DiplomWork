import { firstValueFrom, Observable } from "rxjs";

export async function allObservables<T extends any[]>(
    ...observables: { [P in keyof T]: Observable<T[P]> }
): Promise<T> {
    const result = await Promise.all(observables.map(firstValueFrom));
    return result as T;
}
