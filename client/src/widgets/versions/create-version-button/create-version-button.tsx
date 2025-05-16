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
    Input,
    DialogClose
} from "@/shared/ui";
import { Plus } from "lucide-react";
import { useCreateVersionButton } from "./hooks";

export function CreateVersionButton() {
    const { display, form, isPending, onSubmit } = useCreateVersionButton();

    return (
        <>
            {display && (
                <Dialog>
                    <DialogTrigger>
                        <div className="border-2 p-2 rounded-md cursor-pointer" title="Создать">
                            <Plus />
                        </div>
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
