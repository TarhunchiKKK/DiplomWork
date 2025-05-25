import { TFormField } from "@/shared/types";
import { TFormState } from "./types";

export const defaultValues: TFormState = {
    username: "",
    password: ""
};

export const formFields: TFormField<TFormState>[] = [
    {
        name: "username",
        label: "Отображаемое имя",
        placeholder: "Введите никнейм",
        description: "Это имя будет отображаться для других сотрудников",
        type: "text"
    },
    {
        name: "password",
        label: "Пароль",
        placeholder: "Придумайте пароль",
        description: "Ваш пароль для входа в аккаунт",
        type: "password"
    }
];
