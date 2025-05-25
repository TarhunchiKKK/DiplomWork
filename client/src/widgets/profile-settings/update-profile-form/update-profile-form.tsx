"use client";

import { Button, Form, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { useUpdateProfileForm } from "./hooks";
import { formFields } from "./constants";

export function UpdateProfileForm() {
    const { form, onSubmit, isPending } = useUpdateProfileForm();

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="flex justify-between items-end">
                <div className="space-y-2">
                    {formFields.map(formField => (
                        <FormField
                            key={formField.name}
                            name={formField.name}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formField.label}</FormLabel>

                                    <Input
                                        {...field}
                                        type={formField.type}
                                        placeholder={formField.placeholder}
                                        className="w-[300px]"
                                    />
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
