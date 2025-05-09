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
import { useDocumentTypesForm, useUpdate } from "./hooks";
import { getTagRenderer } from "./ui";
import { Suspense } from "react";

export function DocumentTypesForm() {
    const { documentTypesSet, form, onSubmit, isLoading } = useDocumentTypesForm();

    const { update, isPending } = useUpdate();

    return (
        <div>
            <Form {...form}>
                <form onSubmit={onSubmit} className="mb-4 space-y-4 w-[600px]">
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Типы документов</FormLabel>

                                <FormControl>
                                    <Input {...field} type="text" disabled={isPending} placeholder="Тип документа" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <Suspense fallback={<TagsCloudSkeleton />}>
                <TagsCloud
                    items={documentTypesSet.items}
                    renderItem={getTagRenderer(documentTypesSet.remove)}
                    className="w-[800px] mb-4"
                />
            </Suspense>

            <Button onClick={() => update(documentTypesSet.items)} disabled={isPending || isLoading}>
                Сохранить
            </Button>
        </div>
    );
}
