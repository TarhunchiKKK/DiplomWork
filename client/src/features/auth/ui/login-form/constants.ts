import { TFormField } from "@/shared/types";
import { TFormState } from "./types";

export const defaultValues: TFormState = {
    login: "",
    password: ""
};

export const formFields: TFormField<TFormState>[] = [
    {
        name: "login",
        label: "Логин",
        placeholder: "Ваш логин",
        description: "Ваш логин, используемый для входа в аккаунт",
        type: "text"
    },
    {
        name: "password",
        label: "Пароль",
        placeholder: "Ваш пароль",
        description: "Ваш пароль для входа в аккаунт",
        type: "password"
    }
];
