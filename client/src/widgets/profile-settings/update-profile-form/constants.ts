import { TFormField } from "@/shared/types";
import { TFormState } from "./types";

export const formFields: TFormField<TFormState>[] = [
    {
        name: "username",
        label: "Отображаемое имя",
        type: "text",
        placeholder: "Введите имя"
    }
];
