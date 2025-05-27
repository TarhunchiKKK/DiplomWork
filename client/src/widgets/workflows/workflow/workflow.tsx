import { Card, CardDescription, CardFooter, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { TProps } from "./types";
import Link from "next/link";
import { routes } from "@/shared/routing";

export function Workflow({ workflow }: TProps) {
    return (
        <Card className="py-4 gap-1">
            <CardHeader>
                <CardTitle>{workflow.documentTitle}</CardTitle>

                <CardDescription>
                    Вас добавили к маршруту согласования документа {workflow.documentTitle}.{" "}
                    <Link href={routes.dashboard.documents.one(workflow.documentId)} className="underline">
                        Перейти
                    </Link>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export function WorkflowSkeleton() {
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
