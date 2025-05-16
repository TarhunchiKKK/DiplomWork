"use client";

import {
    Button,
    Checkbox,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input
} from "@/shared/ui";
import { useCreateDocumentButton } from "./hooks";
import { Plus } from "lucide-react";
import { DocumentTypeDropdown } from "./document-type-dropdown";
import { DocumentAimDropdown } from "./document-aim-dropdown";

export function CreateDocumentButton() {
    const { form, onSubmit, isPending } = useCreateDocumentButton();

    return (
        <Dialog>
            <DialogTrigger>
                <div className="border-2 p-2 rounded-md cursor-pointer" title="Создать">
                    <Plus />
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Создание документа</DialogTitle>

                    <DialogDescription>Заполните форму ниже чтобы создать документ.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormField
                            key="aimId"
                            name="aimId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Цель документа</FormLabel>

                                    <div className="w-min">
                                        <DocumentAimDropdown {...field} />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            key="typeId"
                            name="typeId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Тип документа</FormLabel>

                                    <div className="w-min">
                                        <DocumentTypeDropdown {...field} />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            key="isUrgent"
                            name="isUrgent"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-1">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>

                                    <FormLabel className="cursor-pointer">Это срочный документ</FormLabel>
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
    );
}
