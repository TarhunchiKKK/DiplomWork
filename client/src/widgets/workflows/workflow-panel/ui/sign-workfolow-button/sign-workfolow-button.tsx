import { Button, Form, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { TProps } from "./types";
import { useSignWorkflowButton } from "./hooks";

export function SignWorkflowButton({ documentId }: TProps) {
    const { form, onSubmit, isPending } = useSignWorkflowButton(documentId);

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4 flex flex-col items-center">
                    <FormField
                        key="files"
                        name="files"
                        control={form.control}
                        render={() => (
                            <FormItem>
                                <FormLabel>Подписанный документ:</FormLabel>

                                <Input {...form.register("files")} type="file" />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="cursor-pointer w-min" disabled={isPending}>
                        Подписать
                    </Button>
                </form>
            </Form>
        </div>
    );
}
