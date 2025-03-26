"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, Input, TagsCloud } from "@/shared/ui";
import { useFormState, useUpdate } from "./hooks";
import { getTagRenderer } from "./ui";

export function DocumentTypesForm() {
    const { update, isPending } = useUpdate();

    const { documentTypes, form, onSubmit } = useFormState();

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4 w-[600px]">
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Типы документов</FormLabel>

                                <FormControl>
                                    <Input {...field} type="text" disabled={isPending} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <TagsCloud
                items={documentTypes.data}
                renderItem={getTagRenderer(documentTypes.remove)}
                className="w-[800px]"
            />
        </div>
    );
}
