"use client";

import { Button, Form, FormField, FormItem, Input } from "@/shared/ui";
import { useCreateCommentForm } from "./hooks";
import { ArrowBigRight } from "lucide-react";
import { TProps } from "./types";

export function CreateCommentForm({ versionId }: TProps) {
    const { form, onSubmit, isPending } = useCreateCommentForm(versionId);

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="flex items-center gap-0 border rounded-sm">
                <FormField
                    key="message"
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="grow">
                            <Input
                                {...field}
                                type="text"
                                placeholder="Оставьте комментарий"
                                className="border-none h-12"
                            />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending} className="size-12">
                    <ArrowBigRight />
                </Button>
            </form>
        </Form>
    );
}
