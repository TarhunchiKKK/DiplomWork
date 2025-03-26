"use client";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, TagsCloud } from "@/shared/ui";
import { removeTempId } from "../../helpers";
import { useFormState, useUpdate } from "./hooks";
import { getTagRenderer } from "./ui";

export function DocumentAimsForm() {
    const { update, isPending } = useUpdate();

    const { documentAims, form, onSubmit, organization } = useFormState();

    const handleUpdate = () => {
        update({
            organizationId: organization._id,
            documentAims: documentAims.data.map(removeTempId)
        });
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4 w-[600px]">
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Цели документов</FormLabel>

                                <FormControl>
                                    <Input {...field} type="text" disabled={isPending} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <TagsCloud
                items={documentAims.data}
                renderItem={getTagRenderer(documentAims.remove)}
                className="w-[800px] mb-4"
            />

            <Button onClick={handleUpdate} disabled={isPending}>
                Сохранить
            </Button>
        </div>
    );
}
