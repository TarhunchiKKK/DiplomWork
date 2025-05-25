import { TFormState } from "./types";
import { useRegisterAdmin } from "@/features/auth";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/routing";
import { useForm } from "react-hook-form";
import { defaultValues } from "./constants";

export function useRegisterAdminForm() {
    const router = useRouter();

    const { mutate: registerAdmin, isPending } = useRegisterAdmin();

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        registerAdmin(values);

        router.push(routes.dashboard.index);
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
