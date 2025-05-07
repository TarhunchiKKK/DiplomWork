"use client";

import { useForm } from "react-hook-form";
import { TConfirmInvitationFormState } from "./types";
import { defaultValues, formFields } from "./constants";
import { useConfirmInvitation } from "./hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, Wrapper } from "@/shared/ui";

export function ConfirmInvitationForm() {
    const form = useForm<TConfirmInvitationFormState>({
        defaultValues: defaultValues
    });

    const { confirmInvitation, isPending } = useConfirmInvitation();

    const onSubmit = (values: TConfirmInvitationFormState) => {
        confirmInvitation(values);
    };

    return (
        <Wrapper heading="Приглашение" description="Чтобы окончить регистрацию введите необходимые данные">
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

                    <Button type="submit" disabled={isPending} className="w-full">
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
        </Wrapper>
    );
}
