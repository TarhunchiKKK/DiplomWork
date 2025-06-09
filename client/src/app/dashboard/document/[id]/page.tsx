import { Metadata } from "next";
import DocumentPageContent from "./page-content";

export const metadata: Metadata = {
    title: "Single Document",
    description: "This page allows you to manage document, workflow and comments."
};

export default function DocumentPage() {
    return <DocumentPageContent />;
}
