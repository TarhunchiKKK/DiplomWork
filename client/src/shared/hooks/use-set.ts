import { useState } from "react";

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
