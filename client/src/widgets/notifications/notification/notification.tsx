import { Card, CardDescription, CardFooter, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { TProps } from "./types";
import { formatFullDate } from "@/shared/helpers";

export function Notification({ notification }: TProps) {
    return (
        <Card className="py-4 gap-1">
            <CardHeader>
                <CardTitle>{notification.subject}</CardTitle>

                <CardDescription>{notification.message}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end">{formatFullDate(notification.createdAt)}</CardFooter>
        </Card>
    );
}

export function NotificationSkeleton() {
    return (
        <Card className="py-4 gap-1">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-[400px] h-4 rounded-sm" />
                </CardTitle>

                <CardDescription>
                    <Skeleton className="w-[full] h-10 rounded-sm" />
                </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end">
                <Skeleton className="w-[300px] h-6 rounded-sm" />
            </CardFooter>
        </Card>
    );
}
