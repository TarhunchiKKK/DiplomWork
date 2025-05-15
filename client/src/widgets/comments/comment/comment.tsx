import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";
import { TProps } from "./types";
import { formatDateOnly, formatTimeOnly } from "@/shared/helpers";
import { useMultipleUsers } from "@/entities/users";

export function Comment({ comment }: TProps) {
    const { users } = useMultipleUsers({ ids: [comment.creatorId], enabled: true });

    return (
        <Card>
            <CardHeader>
                {users?.[0] && <CardTitle>{users[0].username ?? users[0].email}</CardTitle>}

                <CardDescription>{comment.message}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end">{`${formatDateOnly(comment.createdAt)} в ${formatTimeOnly(comment.createdAt)}`}</CardFooter>
        </Card>
    );
}
