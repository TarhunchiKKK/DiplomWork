"use client";

import { useForm } from "react-hook-form";
import { TLoginDto } from "./types";
import { defaultValues, formFields } from "./constants";
import { useLogin } from "./hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, FormWrapper } from "@/shared/ui";
import { routes } from "@/shared/routing";

export function LoginForm() {
    const form = useForm<TLoginDto>({
        defaultValues: defaultValues
    });

    const onSubmit = (values: TLoginDto) => {
        login(values);
    };

    const { login, isPending } = useLogin();

    return (
        <FormWrapper
            heading="Вход в аккаунт"
            description="Введите необходимые данные для входа в профиль"
            backButtonLabel="Нет организации? Создайте"
            backButtonHref={routes.auth.registerAdmin}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {formFields.map(formField => (
                        <FormField
                            key={formField.name}
                            control={form.control}
                            name={formField.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formField.label}</FormLabel>

                                    <FormControl>
                                        <Input {...field} type={formField.type} placeholder={formField.placeholder} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button type="submit" disabled={isPending} className="w-full">
                        Войти
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
}
