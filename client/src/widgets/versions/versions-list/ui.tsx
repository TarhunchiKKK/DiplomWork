import { formatFullDate } from "@/shared/helpers";
import { Card, CardDescription, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { TItemProps } from "./types";
import { useCurrentDocumentStore } from "@/entities/documents";

export function ListItem({ version, onClick }: TItemProps) {
    const currentVersionId = useCurrentDocumentStore(state => state.versionId);

    return (
        <Card className={`${currentVersionId === version.id ? "bg-accent" : ""} `}>
            <CardHeader
                className="flex justify-start items-center gap-4 cursor-pointer"
                onClick={onClick.bind(null, version.id)}
            >
                <CardTitle>{formatFullDate(version.createdAt)}</CardTitle>

                <CardDescription className="flex-grow">{version.description ?? ""}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export function ListItemSkeleton() {
    return (
        <Card>
            <CardHeader className="flex justify-start items-center gap-4">
                <CardTitle>
                    <Skeleton className="w-[150px] h-4 rounded-sm" />
                </CardTitle>

                <CardDescription>
                    <Skeleton className="w-[400px] h-4 rounded-sm" />
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
