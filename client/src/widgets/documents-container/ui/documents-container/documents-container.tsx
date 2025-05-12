"use client";

import { useDisplayDocumentsStore } from "../../lib";
import { TProps } from "./types";
import { DocumentRowItem } from "./ui";

export function DocumentsContainer({ documents }: TProps) {
    // const displayType = useDisplayDocumentsStore(state => state.displayType);

    return (
        <div className="space-y-4">
            {documents.map(document => (
                <DocumentRowItem key={document.id} document={document} />
            ))}
        </div>
    );
}
