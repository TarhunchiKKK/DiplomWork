import { TProps } from "./types";

export function EmptyListMessage({ items, message }: TProps) {
    if (!items) {
        return <></>;
    }

    if (items.length === 0) {
        return <p className="text-center py-2 text-lg font-semibold">{message}</p>;
    }

    return <></>;
}
