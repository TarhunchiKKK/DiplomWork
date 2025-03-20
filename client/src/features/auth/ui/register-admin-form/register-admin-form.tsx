"use client";

import { useForm } from "react-hook-form";
import { defaultValues, formFields } from "./constants";
import { TRegisterAdminDto, useRegisterAdmin } from "../../api";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { routes } from "@/shared/routing";
import { Wrapper } from "../wrapper";

// TODO: Add FormDescription for validation errors
export function RegisterAdminForm() {
    const form = useForm<TRegisterAdminDto>({
        defaultValues: defaultValues
    });

    const onSubmit = (values: TRegisterAdminDto) => {
        register(values);
    };

    const { register, isPending } = useRegisterAdmin();

    return (
        <Wrapper
            heading="Регистрация"
            description="Чтобы зарегистрироваться в сервисе введите необходимые данные."
            backButtonLabel="Есть аккаунт? Войти"
            backButtonHref={routes.auth.login}
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
                        ></FormField>
                    ))}

                    {/* {error?.response?.data.message && (
                        <FormDescription className="text-red-400">
                            {error.response?.data[formField.name]}
                        </FormDescription>
                    )} */}

                    <Button type="submit" disabled={isPending} className="w-full">
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
        </Wrapper>
    );
}
