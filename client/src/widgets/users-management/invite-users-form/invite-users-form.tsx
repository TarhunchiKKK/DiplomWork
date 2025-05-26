"use client";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, TagsCloud } from "@/shared/ui";
import { useInviteUsersForm } from "./hooks";
import { getTagRendereer } from "./ui";
import { useUsersInvitation } from "@/entities/users";

export function InviteUsersForm() {
    const { emailsSet, form, onSubmit } = useInviteUsersForm();

    const { mutate: invite, isPending } = useUsersInvitation();

    return (
        <div>
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4 w-[800px]">
                    <FormField
                        key="value"
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта нового участника</FormLabel>

                                <FormControl>
                                    <Input {...field} type="email" placeholder="Введите email" className="w-[500px]" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <TagsCloud
                items={emailsSet.items}
                renderItem={getTagRendereer(emailsSet.remove)}
                className="w-[800px] mt-4 mb-8"
            />

            <Button onClick={() => invite(emailsSet.items)} disabled={isPending}>
                Пригласить
            </Button>
        </div>
    );
}
