export type TFormField<T> = {
    name: keyof T;

    label: string;

    placeholder: string;

    description?: string;

    type: "text" | "email" | "password";
};
