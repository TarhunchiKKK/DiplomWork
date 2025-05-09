import { FilledInput, Form, FormField, FormItem } from "@/shared/ui";
import { usePost } from "./hooks";
import { TProps } from "./types";
import { Trash } from "lucide-react";

export function SinglePostForm(props: TProps) {
    const { form, onSubmit, post } = usePost(props);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="ml-4">
                <div className="flex flex-row items-center gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FilledInput
                                    {...field}
                                    type="text"
                                    placeholder="Должность"
                                    onBlur={post.update}
                                    className="w-[350px]"
                                />
                            </FormItem>
                        )}
                    />

                    <Trash size={14} onClick={post.remove} className="cursor-pointer" />
                </div>
            </form>
        </Form>
    );
}
