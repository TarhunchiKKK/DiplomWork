import { TDocumentShortData } from "@/entities/documents";
import { DocumentsContainer, DocumentsDisplayTypeTabs } from "@/widgets/documents-container";

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
    },
    {
        id: "4",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "5",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "6",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    },
    {
        id: "7",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "8",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "9",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    },
    {
        id: "10",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "11",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "33",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    }
];

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <DocumentsDisplayTypeTabs />
            </div>

            <DocumentsContainer documents={documents} />
        </div>
    );
}
