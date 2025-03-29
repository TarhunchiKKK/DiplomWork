"use client";

import { SingleDivisionForm } from "./single-division-form";
import { AddDivisionButton } from "./add-division-button";
import { useDivisionsStore } from "./store";
import { Button } from "@/shared/ui";
import { useSetup, useUpdate } from "./hooks";

export function AdministrativeDivisionsForm() {
    useSetup();

    const divisions = useDivisionsStore(state => state.data);

    const { update, isPending } = useUpdate();

    return (
        <>
            <h3 className="text-lg mb-4">Административные подразделения:</h3>

            <div className="flex flex-col items-start gap-4 mb-4">
                {divisions.map((division, index) => (
                    <SingleDivisionForm key={index} divisionTempId={division.tempId} />
                ))}
            </div>

            <Button onClick={() => update()} disabled={isPending}>
                Сохранить
            </Button>

            <AddDivisionButton className="fixed top-8 right-8" />
        </>
    );
}
