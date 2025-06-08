import { Metadata } from "next";
import ParticipationWorkflowsPageContent from "./page-content";

export const metadata: Metadata = {
    title: "Other Workflows",
    description: "On this page you can see workflows in which you are invited."
};

export default function ParticipationWorkflowsPage() {
    return <ParticipationWorkflowsPageContent />;
}
