import { Button, FilledInput, Form, FormControl, FormField, FormItem } from "@/shared/ui";
import { useSingleDivision } from "./hooks";
import { TProps } from "./types";
import { Trash } from "lucide-react";
import { useClickOutside } from "@/shared/hooks";
import { SinglePostForm } from "../single-post-form";

export function SingleDivisionForm({ divisionTempId }: TProps) {
    const { form, onSubmit, division, posts } = useSingleDivision(divisionTempId);

    const wrapperRef = useClickOutside<HTMLDivElement>(() => {
        posts.setInvisible();
        division.update();
    });

    return (
        <div ref={wrapperRef} onClick={posts.setVisible} className="shadow-lg border-2 px-2 py-3 rounded-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[600px]">
                    <div className="flex flex-row justify-between items-center">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FilledInput
                                            {...field}
                                            placeholder="Название отдела"
                                            type="text"
                                            className="tetx-lg w-[300px] font-bold"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button variant="outline" size="icon" onClick={division.remove} className="cursor-pointer">
                            <Trash size={16} />
                        </Button>
                    </div>
                </form>
            </Form>

            {posts.visible && (
                <div>
                    {posts.data.map(post => (
                        <SinglePostForm key={post.tempId} divisionTempId={divisionTempId} postTempId={post.tempId} />
                    ))}
                </div>
            )}
        </div>
    );
}
