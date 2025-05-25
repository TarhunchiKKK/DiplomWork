"use client";

import { useUpdatePasswordForm } from "./hooks";
import { TProps } from "./types";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormWrapper, Input } from "@/shared/ui";

export function UpdatePasswordForm({ recoveryToken }: TProps) {
    const { form, onSubmit, isPending, isPasswordUpdated } = useUpdatePasswordForm(recoveryToken);

    return (
        <FormWrapper heading="Смена пароля" description="Придумайте новый пароль и введите его ниже.">
            {isPasswordUpdated && (
                <p className="text-center">Ваш пароль был обновлен. Вы можете закрыть эту страницу.</p>
            )}

            {!isPasswordUpdated && (
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
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
