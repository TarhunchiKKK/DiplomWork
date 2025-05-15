import { TFormField } from "@/shared/types";
import { TRegisterDto } from "./types";

export const defaultValues: TRegisterDto = {
    username: "",
    email: "",
    password: ""
};

export const formFields: TFormField<TRegisterDto>[] = [
    {
        name: "username",
        label: "Отображаемое имя",
        placeholder: "Введите никнейм",
        description: "Это имя будет отображаться для других сотрудников",
        type: "text"
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Введите электронную почту",
        description: "Ваша рабочая электронная почта",
        type: "email"
    },
    {
        name: "password",
        label: "Пароль",
        placeholder: "Придумайте пароль",
        description: "Ваш пароль для входа в аккаунт",
        type: "password"
    }
];
