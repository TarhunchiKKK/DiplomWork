import { WorkflowPanel } from "@/widgets/workflows";

export default function Home() {
    return (
        <div className="w-[400px] min-h-[500px] relative border-2">
            <WorkflowPanel documentId={"1"} />
        </div>
    );
}
