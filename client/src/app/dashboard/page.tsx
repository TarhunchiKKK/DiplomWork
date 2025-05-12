import { TDocumentShortData } from "@/entities/documents";
import { DocumentsContainer } from "@/widgets/documents-container";

const documents: TDocumentShortData[] = [
    {
        id: "1",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "2",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "3",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    }
];

export default function DashboardPage() {
    return <DocumentsContainer documents={documents} />;
}
