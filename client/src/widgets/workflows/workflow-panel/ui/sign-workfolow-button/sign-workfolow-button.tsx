import { Button, CenteredChild, CenteredChildParent, Form, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { TProps } from "./types";
import { useSignWorkflowButton } from "./hooks";

export function SignWorkflowButton({ documentId }: TProps) {
    const { form, onSubmit, isPending } = useSignWorkflowButton(documentId);

    return (
        <CenteredChildParent>
            <CenteredChild>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormField
                            key="files"
                            name="files"
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>Подписанный документ</FormLabel>

                                    <Input {...form.register("files")} type="text" />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Button type="submit" className="cursor-pointer" disabled={isPending}>
                    Подписать
                </Button>
            </CenteredChild>
        </CenteredChildParent>
    );
}
