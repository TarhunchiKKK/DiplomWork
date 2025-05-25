import { useProfileStore } from "@/features/auth";
import { TFormState } from "./types";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "@/entities/users";

export function useUpdateProfileForm() {
    const profile = useProfileStore(state => state.profile);

    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const form = useForm<TFormState>({
        defaultValues: {
            username: profile?.username ?? ""
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        updateProfile(data);
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
