import { TFormField } from "@/shared/types";
import { TUpdateProfileFormState } from "./types";

export const formFields: TFormField<TUpdateProfileFormState>[] = [
    {
        name: "username",
        label: "Отображаемое имя",
        type: "text",
        placeholder: "Введите имя"
    }
];
