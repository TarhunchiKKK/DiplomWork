import { Card, CardContent, CardDescription, CardTitle, Skeleton } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { containerClassNames, iconSizes } from "./constants";
import { TSIngleItemProps } from "./types";
import { formatFullDate, getDocumentIcon } from "@/shared/helpers";
import { DocumentsDisplayType } from "../shared";
import { routes } from "@/shared/routing";

export function DocumentsRowItem({ document }: TSIngleItemProps) {
    const iconPath = getDocumentIcon(document.title);

    const iconSize = iconSizes[DocumentsDisplayType.ROWS];

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src={iconPath} alt="icon" width={iconSize} height={iconSize} />

                        <CardTitle>
                            <Link href={routes.dashboard.documents.one(document.id)}>{document.title}</Link>
                        </CardTitle>
                    </div>

                    <CardDescription>{formatFullDate(document.createdAt)}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

export function DocumentsGridItem({ document }: TSIngleItemProps) {
    const iconPath = getDocumentIcon(document.title);

    const iconSize = iconSizes[DocumentsDisplayType.GRID];

    return (
        <Card className="w-[180px]">
            <CardContent>
                <div className="flex flex-col items-center space-y-2">
                    <Image src={iconPath} alt="icon" width={iconSize} height={iconSize} />

                    <CardTitle className="text-center">
                        <Link href={routes.dashboard.documents.one(document.id)} className="text-center">
                            {document.title}
                        </Link>
                    </CardTitle>

                    <CardDescription>{formatFullDate(document.createdAt)}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

export function DocumentsContainerSkeleton() {
    const containerClassName = containerClassNames[DocumentsDisplayType.ROWS];

    return (
        <div className={containerClassName}>
            {[...Array(9)].map((_, index) => (
                <Card key={index}>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Skeleton className="size-6 rounded-sm" />

                                <CardTitle>
                                    <Skeleton className="h-4 w-[150px]" />
                                </CardTitle>
                            </div>

                            <CardDescription>
                                <Skeleton className="h-4 w-[150px]" />
                            </CardDescription>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
