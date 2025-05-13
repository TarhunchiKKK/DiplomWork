import { getDocumentIcon } from "@/shared/helpers";
import { mocks } from "@/dev/mocks";
import { Card, CardContent, CardFooter, Skeleton } from "@/shared/ui";
import Image from "next/image";
import { ICON_SIZE } from "./constants";
import { Timer } from "lucide-react";
import {
    DocumentButtons,
    DownloadButton,
    DocumentHeader,
    DocumentParams,
    DocumentButtonsSkeleton,
    DocumentHeaderSkeleton,
    DocumentParamsSkeleton,
    DownloadButtonSkeleton
} from "./ui";

const document = mocks.document;

export function DocumentInfo() {
    // const {document} = useDocument()

    const iconPath = getDocumentIcon(document.title);

    return (
        <Card className="min-w-[600px] flex-row! justify-between items-start">
            <CardContent>
                <div className="relative">
                    <Image src={iconPath} alt={document.title} width={ICON_SIZE} height={ICON_SIZE} />

                    {document.isUrgent && (
                        <div className="absolute top-0 right-0">
                            <Timer color="red" />
                        </div>
                    )}
                </div>
            </CardContent>

            <div className="min-w-[200px] space-y-4">
                <DocumentHeader />

                <CardFooter className="flex-col items-start gap-4">
                    <DocumentParams />

                    <div className="space-y-2 w-full">
                        <DocumentButtons />

                        <DownloadButton />
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}

export function DocumentInfoSkeleton() {
    return (
        <Card className="min-w-[600px] flex-row! justify-between items-start">
            <CardContent>
                <Skeleton className="w-[200px] h-[200px] rounded-md" />
            </CardContent>

            <div className="min-w-[200px] space-y-4">
                <DocumentHeaderSkeleton />

                <CardFooter className="flex-col items-start gap-4">
                    <DocumentParamsSkeleton />

                    <div className="w-full space-y-2">
                        <DocumentButtonsSkeleton />

                        <DownloadButtonSkeleton />
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}
