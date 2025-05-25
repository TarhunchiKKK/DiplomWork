"use client";

import { formFields } from "./constants";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, FormWrapper } from "@/shared/ui";
import { useConfirmInvitationForm } from "./hooks";
import { TProps } from "./types";

export function ConfirmInvitationForm({ invitationToken }: TProps) {
    const { form, onSubmit, isPending } = useConfirmInvitationForm(invitationToken);

    return (
        <FormWrapper heading="Приглашение" description="Чтобы окончить регистрацию введите необходимые данные">
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

                    <Button type="submit" disabled={isPending} className="w-full">
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
}
