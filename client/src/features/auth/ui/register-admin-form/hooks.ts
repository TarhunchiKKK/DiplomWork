import { TFormState } from "./types";
import { useRegisterAdmin } from "@/features/auth";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/routing";
import { useForm } from "react-hook-form";
import { defaultValues } from "./constants";
import { toast } from "sonner";

export function useRegisterAdminForm() {
    const router = useRouter();

    const { mutate: registerAdmin, isPending } = useRegisterAdmin({
        onSuccess: () => {
            toast.success("Успешная регистрация");

            router.push(routes.dashboard.index);
        }
    });

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        registerAdmin(values);
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
