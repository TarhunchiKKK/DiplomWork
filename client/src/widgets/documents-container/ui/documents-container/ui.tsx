import { TDocumentShortData } from "@/entities/documents";
import { getDocumentIcon } from "@/shared/files";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useDisplayDocumentsStore } from "../../lib";
import { iconSizes } from "./constants";

export function DocumentRowItem({ document }: { document: TDocumentShortData }) {
    const displayType = useDisplayDocumentsStore(state => state.displayType);

    const iconPath = getDocumentIcon(document.title);

    const iconSize = iconSizes[displayType];

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
