import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { iconSizes } from "./constants";
import { DocumentsDisplayType } from "../../enums";
import { TSIngleItemProps } from "./types";
import { getDocumentIcon } from "@/shared/helpers";

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
                            <Link href="#">{document.title}</Link>
                        </CardTitle>
                    </div>

                    <CardDescription>{document.createdAt.toISOString()}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

export function DocumentsGridItem({ document }: TSIngleItemProps) {
    const iconPath = getDocumentIcon(document.title);

    const iconSize = iconSizes[DocumentsDisplayType.GRID];

    return (
        <Card className="w-min">
            <CardContent>
                <div className="flex flex-col items-center space-y-2">
                    <Image src={iconPath} alt="icon" width={iconSize} height={iconSize} />

                    <CardTitle>
                        <Link href="#">{document.title}</Link>
                    </CardTitle>

                    <CardDescription>{document.createdAt.toISOString()}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}
