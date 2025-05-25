"use client";

import { formFields } from "./constants";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, FormWrapper } from "@/shared/ui";
import { routes } from "@/shared/routing";
import { useRegisterAdminForm } from "./hooks";

export function RegisterAdminForm() {
    const { form, onSubmit, isPending } = useRegisterAdminForm();

    return (
        <FormWrapper
            heading="Регистрация"
            description="Чтобы зарегистрироваться в сервисе введите необходимые данные."
            backButtonLabel="Есть аккаунт? Войти"
            backButtonHref={routes.auth.login}
        >
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
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

                    <Button type="submit" disabled={isPending} className="w-full">
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
}
