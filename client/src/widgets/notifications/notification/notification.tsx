"use client";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    Skeleton
} from "@/shared/ui";
import { TProps } from "./types";
import { formatFullDate } from "@/shared/helpers";
import { useNotification } from "./hooks";
import { classNamesMap } from "./constants";

export function Notification({ notification }: TProps) {
    const { menuItems, isPending } = useNotification(notification);

    const additionalClassName = classNamesMap[notification.status];

    return (
        <ContextMenu>
            <ContextMenuTrigger className="block" disabled={isPending}>
                <Card className={"py-4 gap-1" + additionalClassName}>
                    <CardHeader>
                        <CardTitle>{notification.subject}</CardTitle>

                        <CardDescription>{notification.message}</CardDescription>
                    </CardHeader>

                    <CardFooter className="flex justify-end">{formatFullDate(notification.createdAt)}</CardFooter>
                </Card>
            </ContextMenuTrigger>

            <ContextMenuContent>
                {menuItems.map((item, index) => (
                    <ContextMenuItem key={index} className="cursor-pointer" onClick={item.onClick}>
                        {item.label}
                    </ContextMenuItem>
                ))}
            </ContextMenuContent>
        </ContextMenu>
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
