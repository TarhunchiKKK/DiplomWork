"use client";

import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Button,
    Dialog,
    DialogTrigger,
    DialogContent,
    Form,
    FormField,
    FormItem,
    FormLabel,
    Input
} from "@/shared/ui";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCreateVersionButton } from "./hooks";

export function CreateVersionButton() {
    const { display, form, isPending, onSubmit } = useCreateVersionButton();

    return (
        <>
            {display && (
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline" size="icon" title="Создать">
                            <Plus />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создание версии документа</DialogTitle>

                            <DialogDescription>
                                Заполните форму ниже чтобы создать новую версию файла.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form className="space-y-4" onSubmit={onSubmit}>
                                <FormField
                                    key="description"
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Описание</FormLabel>

                                            <Input {...field} type="text" placeholder="Описание версии документа" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    key="files"
                                    name="files"
                                    control={form.control}
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Файл документа</FormLabel>

                                            <Input {...form.register("files")} type="file" />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <DialogClose>
                                        <Button type="submit" variant="outline" className="w-full" disabled={isPending}>
                                            Сохранить
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
