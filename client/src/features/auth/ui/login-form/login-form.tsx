"use client";

import { TProps } from "./types";
import { formFields } from "./constants";
import { useLoginForm } from "./hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, FormWrapper } from "@/shared/ui";
import { routes } from "@/shared/routing";
import { Captcha } from "../recaptcha";

export function LoginForm(props: TProps) {
    const { form, onSubmit, isPending, setRecaptchaValue } = useLoginForm(props);

    return (
        <FormWrapper
            heading="Вход в аккаунт"
            description="Введите необходимые данные для входа в профиль"
            backButtonLabel="Нет организации? Создайте"
            backButtonHref={routes.auth.registerAdmin}
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
                        />
                    ))}

                    <Captcha onChange={setRecaptchaValue} />

                    <Button type="submit" disabled={isPending} className="w-full">
                        Войти
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
}
