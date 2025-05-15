import { AuthType } from "@/entities/users";

export const dropdownOptions = [
    {
        label: "По паролю",
        value: AuthType.BASIC
    },
    {
        label: "С использованием TOTP",
        value: AuthType.TOTP
    }
];
