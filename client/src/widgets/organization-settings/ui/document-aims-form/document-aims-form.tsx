"use client";

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    TagsCloud,
    TagsCloudSkeleton
} from "@/shared/ui";
import { useUpdate, useDocumentAimsForm } from "./hooks";
import { getTagRenderer } from "./ui";
import { Suspense } from "react";

export function DocumentAimsForm() {
    const { update, isPending } = useUpdate();

    const { documentAimsSet, form, onSubmit, isLoading } = useDocumentAimsForm();

    return (
        <div>
            <Form {...form}>
                <form onSubmit={onSubmit} className="mb-4 space-y-4 w-[600px]">
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

            <Suspense fallback={<TagsCloudSkeleton />}>
                <TagsCloud
                    items={documentAimsSet.items}
                    renderItem={getTagRenderer(documentAimsSet.remove)}
                    className="w-[800px] mb-4"
                />
            </Suspense>

            <Button onClick={() => update(documentAimsSet.items)} disabled={isPending || isLoading}>
                Сохранить
            </Button>
        </div>
    );
}
