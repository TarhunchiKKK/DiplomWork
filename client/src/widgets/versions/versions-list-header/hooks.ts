import { TProfile, useProfileStore } from "@/features/auth";
import { useCurrentDocument } from "@/widgets/document";

export function useButton() {
    const { document } = useCurrentDocument();

    const profile = useProfileStore(state => state.profile) as TProfile;

    return {
        display: profile.id === document?.authorId
    };
}
