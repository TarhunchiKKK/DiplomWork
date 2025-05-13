"use client";

import { useDisplayDocumentsStore } from "../shared";
import { containerClassNames, documentsItems } from "./constants";
import { TProps } from "./types";

export function DocumentsContainer({ documents }: TProps) {
    const displayType = useDisplayDocumentsStore(state => state.displayType);

    const DocumentsItem = documentsItems[displayType];

    const containerClassName = containerClassNames[displayType];

    return (
        <div className={containerClassName}>
            {documents.map(document => (
                <DocumentsItem key={document.id} document={document} />
            ))}
        </div>
    );
}
