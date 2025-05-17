import { TagsCloud, TagsCloudSkeleton } from "@/shared/ui";
import { useWorkflowPanel } from "./hooks";
import { renderParticipant } from "./ui";

export function WorkflowPanel() {
    const { displayedParticipants } = useWorkflowPanel();

    return <TagsCloud items={displayedParticipants} renderItem={renderParticipant} />;
}

export function WorkflowPanelSkeleton() {
    return <TagsCloudSkeleton />;
}
