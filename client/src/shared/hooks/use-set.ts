import { useCallback, useEffect, useState } from "react";

export function useSet<T>(initialData: T[] = []) {
    const [set] = useState(new Set(initialData));

    const [items, setItems] = useState<T[]>(initialData);

    const add = (item: T) => {
        set.add(item);
        setItems([...set]);
    };

    const remove = (item: T) => {
        set.delete(item);
        setItems([...set]);
    };

    return {
        items,
        add,
        remove
    };
}

export function useCompareableSet<T, K>(initialData: T[], extractValue: (_: T) => K) {
    const [items, setItems] = useState<T[]>([]);

    const [set] = useState(new Set<K>());

    const add = useCallback(
        (item: T) => {
            const extractedValue = extractValue(item);

            if (set.has(extractedValue)) {
                return false;
            }

            set.add(extractedValue);
            setItems(prev => [...prev, item]);

            return true;
        },
        [extractValue, set]
    );

    const remove = (item: T) => {
        const extractedValue = extractValue(item);

        set.delete(extractedValue);
        setItems(prev => prev.filter(i => extractValue(i) !== extractedValue));
    };

    const has = (item: T) => {
        const extractedValue = extractValue(item);

        return set.has(extractedValue);
    };

    useEffect(() => {
        initialData.forEach(add);
    }, [initialData, extractValue, add]);

    return {
        items,
        add,
        remove,
        has
    };
}
