import {
    useAddToFavourite,
    useFavouriteDocuments,
    useOneDocument,
    useRemoveFromFavourites,
    useUpdateDocument
} from "@/entities/documents";
import { useProfileStore } from "@/features/auth";
import { Star, StarOff, Timer, TimerOff } from "lucide-react";

export function useStartButton(documentId: string) {
    const { data: favouriteDocuments } = useFavouriteDocuments();

    const { mutate: add, isPending: isAddingPending } = useAddToFavourite();

    const { mutate: remove, isPending: isRemovingPending } = useRemoveFromFavourites();

    const isInFavourite = favouriteDocuments?.some(doc => doc.id === documentId);

    const onClick = () => {
        if (isInFavourite) {
            remove(documentId);
        } else {
            add(documentId);
        }
    };

    return {
        props: {
            onClick,
            disabled: isAddingPending || isRemovingPending,
            title: isInFavourite ? "Удалить из изьранного" : "Добавить в избранное"
        },
        icon: isInFavourite ? Star : StarOff
    };
}

export function useUrgencyButton(documentId: string) {
    const { data: document } = useOneDocument(documentId);

    const profile = useProfileStore(state => state.profile);

    const { mutate: update, isPending } = useUpdateDocument();

    const onClick = () => {
        const dto = document!.isUrgent ? { isUrgent: false } : { isUrgent: true };

        update({
            ...dto,
            id: documentId
        });
    };

    return {
        props: {
            onClick,
            disabled: isPending,
            title: document?.isUrgent ? "Пометить как несрочный" : "Пометить как срочный"
        },
        display: profile?.id === document?.authorId,
        icon: document?.isUrgent ? Timer : TimerOff
    };
}
