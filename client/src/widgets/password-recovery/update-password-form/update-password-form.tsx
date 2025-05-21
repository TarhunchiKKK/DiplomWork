"use client";

import { useForm } from "react-hook-form";
import { TUpdatePasswordFormState } from "./types";
import { defaultValues } from "./constants";
import { useUpdatePassword } from "./hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormWrapper, Input } from "@/shared/ui";
import { useState } from "react";

export function UpdatePasswordForm() {
    const form = useForm<TUpdatePasswordFormState>({
        defaultValues: defaultValues
    });
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

    const { update, isPending } = useUpdatePassword();

    const onSubmit = (values: TUpdatePasswordFormState) => {
        update(values);
        setIsPasswordUpdated(true);
    };

    return (
        <FormWrapper heading="Смена пароля" description="Придумайте новый пароль и введите его ниже.">
            {isPasswordUpdated && (
                <p className="text-center">Ваш пароль был обновлен. Вы можете закрыть эту страницу.</p>
            )}

            {!isPasswordUpdated && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            key="password"
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Новый пароль</FormLabel>

                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Придумайте новый пароль" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isPending} className="w-full">
                            Сменить пароль
                        </Button>
                    </form>
                </Form>
            )}
        </FormWrapper>
    );
}
