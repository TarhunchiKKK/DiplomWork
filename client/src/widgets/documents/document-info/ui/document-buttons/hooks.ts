import {
    useAddToFavourite,
    useFavouriteDocuments,
    useOneDocument,
    useRemoveFromFavourites,
    useUpdateDocument
} from "@/entities/documents";
import { TProfile, useProfileStore } from "@/features/auth";
import { Star, StarOff, Timer, TimerOff } from "lucide-react";

export function useStartButton(documentId: string) {
    const { documents: favouriteDocuments } = useFavouriteDocuments();

    const { add, isPending: isAddingPending } = useAddToFavourite();

    const { remove, isPending: isRemovingPending } = useRemoveFromFavourites();

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
    const { document } = useOneDocument(documentId);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { update, isPending } = useUpdateDocument();

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
        display: profile.id === document?.authorId,
        icon: document?.isUrgent ? Timer : TimerOff
    };
}
