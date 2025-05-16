import { Card, CardDescription, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { TProps } from "./types";
import { formatFullDate } from "@/shared/helpers";
import { useMultipleUsers } from "@/entities/users";

export function Comment({ comment }: TProps) {
    const { users } = useMultipleUsers({ ids: [comment.creatorId], enabled: true });

    return (
        <Card>
            <CardHeader>
                {users?.[0] && <CardTitle>{users[0].username ?? users[0].email}</CardTitle>}

                <CardDescription className="space-y-2">
                    {comment.message}

                    <div className="flex justify-end">{formatFullDate(comment.createdAt)}</div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export function CommentSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-[100px] h-4" />
                </CardTitle>

                <CardDescription className="space-y-2">
                    <Skeleton className="w-full h-12" />

                    <div className="flex justify-end">
                        <Skeleton className="w-[100px] h-6" />
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
