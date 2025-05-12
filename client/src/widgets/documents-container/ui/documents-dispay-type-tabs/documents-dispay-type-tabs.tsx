"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { DocumentsDisplayType } from "../../enums";
import { useDisplayDocumentsStore } from "../../lib";
import { Grid, Rows } from "lucide-react";

export function DocumentsDisplayTypeTabs() {
    const displayType = useDisplayDocumentsStore(state => state.displayType);

    const setDisplayType = useDisplayDocumentsStore(state => state.setDisplayType);

    return (
        <Tabs defaultValue={displayType}>
            <TabsList>
                <TabsTrigger
                    value={DocumentsDisplayType.ROWS}
                    onClick={setDisplayType.bind(null, DocumentsDisplayType.ROWS)}
                >
                    <Rows />
                </TabsTrigger>

                <TabsTrigger
                    value={DocumentsDisplayType.GRID}
                    onClick={setDisplayType.bind(null, DocumentsDisplayType.GRID)}
                >
                    <Grid />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
