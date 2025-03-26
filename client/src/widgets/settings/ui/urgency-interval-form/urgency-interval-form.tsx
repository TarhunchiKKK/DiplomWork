"use client";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { useFormState } from "./hooks";

export function UrgencyIntervalForm() {
    const { form, onSubmit, isPending } = useFormState();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-[300px]">
                <FormField
                    control={form.control}
                    name="urgencyInterval"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Интервал срочности (в днях)</FormLabel>

                            <FormControl>
                                <Input {...field} type="number" disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button disabled={isPending} type="submit" size="sm">
                    Сохранить
                </Button>
            </form>
        </Form>
    );
}
