import { TagsCloud, TagsCloudSkeleton } from "@/shared/ui";
import { useWorkflowPanel } from "./hooks";
import { renderParticipant } from "./ui";
import { TProps } from "./types";

export function WorkflowPanel({ documentId }: TProps) {
    const { displayedParticipants } = useWorkflowPanel(documentId);

    return <TagsCloud items={displayedParticipants} renderItem={renderParticipant} />;
}

export function WorkflowPanelSkeleton() {
    return <TagsCloudSkeleton />;
}
