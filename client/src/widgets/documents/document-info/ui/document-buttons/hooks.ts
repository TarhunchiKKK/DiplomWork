import {
    useAddToFavourite,
    useFavouriteDocuments,
    useRemoveFromFavourites,
    useUpdateDocument
} from "@/entities/documents";
import { TProfile, useProfileStore } from "@/features/auth";
import { useCurrentDocument } from "@/widgets/documents";

export function useStartButton() {
    const { documentId } = useCurrentDocument();

    const { documents: favouriteDocuments } = useFavouriteDocuments();

    const { add, isPending: isAddingPending } = useAddToFavourite();

    const { remove, isPending: isRemovingPending } = useRemoveFromFavourites();

    const onClick = () => {
        if (favouriteDocuments!.some(doc => doc.id === documentId)) {
            remove(documentId);
        } else {
            add(documentId);
        }
    };

    return {
        onClick,
        disabled: isAddingPending || isRemovingPending
    };
}

export function useUrgencyButton() {
    const { document, documentId } = useCurrentDocument();

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
        onClick,
        disabled: isPending,
        display: profile.id === document?.authorId
    };
}
