import { Trash } from "lucide-react";
import { useDivisionsStore } from "../../store";
import { useDivisionPostsForm, useDivisionTitleForm } from "./hooks";
import { TProps, TUpdatePostDto } from "./types";
import { Button, FilledInput, Form, FormField, FormItem, FormLabel, Input, Tag, TagsCloud } from "@/shared/ui";

export function DivisionTitleForm({ index }: TProps) {
    const { form, onSubmit } = useDivisionTitleForm(index);

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                    key="value"
                    name="value"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FilledInput {...field} type="text" className="tetx-lg font-bold w-[500px]" />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

const getTagRenderer = (onClick: (item: TUpdatePostDto) => void) => {
    // eslint-disable-next-line react/display-name
    return (data: TUpdatePostDto) => {
        return (
            <Tag
                key={data.title}
                tooltip={
                    <Button variant="default" className="p-0" onClick={onClick.bind(null, data)}>
                        Удалить
                    </Button>
                }
            >
                <Button variant="outline">{data.title}</Button>
            </Tag>
        );
    };
};

export function DivisionPostsForm({ index }: TProps) {
    const { postsSet, form, onSubmit } = useDivisionPostsForm(index);

    return (
        <div>
            <Form {...form}>
                <form onSubmit={onSubmit} className="mb-4 space-y-4 w-[500px]">
                    <FormField
                        key="value"
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название должности</FormLabel>

                                <Input {...field} type="text" placeholder="Должность" />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <TagsCloud items={postsSet.items} renderItem={getTagRenderer(postsSet.remove)} className="w-[800px] mb-4" />
        </div>
    );
}

export function TrashButton({ index, className }: TProps & { className: string }) {
    const { divisions, setData: setDivisions } = useDivisionsStore();

    const handleClick = () => {
        setDivisions(divisions.filter((_, i) => i !== index));
    };

    return (
        <Button variant="outline" size="icon" className={className} onClick={handleClick}>
            <Trash />
        </Button>
    );
}
