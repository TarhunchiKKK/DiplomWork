import { TFormField } from "@/shared/types";
import { TLoginDto } from "./types";

export const defaultValues: TLoginDto = {
    login: "",
    password: ""
};

export const formFields: TFormField<TLoginDto>[] = [
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
