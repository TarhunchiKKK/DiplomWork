"use client";

import { Button } from "@/shared/ui";
import { useDivisionsForm } from "./hooks";
import { AddDivisionButton, SingleDivisionForm } from "./ui";

export function AdministrativeDivisionsForm() {
    const { divisions, update, isPending } = useDivisionsForm();

    return (
        <>
            <h3 className="text-lg mb-4">Административные подразделения</h3>

            <div className="flex flex-col items-start gap-4 mb-4">
                {divisions.map((_, index) => (
                    <SingleDivisionForm key={index} index={index} />
                ))}
            </div>

            <div className="flex justify-center">
                <AddDivisionButton />
            </div>

            <Button disabled={isPending} onClick={() => update()}>
                Сохранить
            </Button>
        </>
    );
}
