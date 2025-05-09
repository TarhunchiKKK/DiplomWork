"use client";

import { Button, Form, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { useUpdateProfile, useUpdateProfileForm } from "./hooks";
import { TUpdateProfileFormState } from "./types";
import { formFields } from "./constants";

export function UpdateProfileForm() {
    const form = useUpdateProfileForm();

    const { update, isPending } = useUpdateProfile();

    const onSubmit = (data: TUpdateProfileFormState) => {
        update(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-end">
                <div className="space-y-2">
                    {formFields.map(formField => (
                        <FormField
                            key={formField.name}
                            name={formField.name}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formField.label}</FormLabel>

                                    <Input {...field} type={formField.type} placeholder={formField.placeholder} />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                <Button type="submit" disabled={isPending}>
                    Обновить
                </Button>
            </form>
        </Form>
    );
}
