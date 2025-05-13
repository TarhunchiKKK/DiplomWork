import { getDocumentIcon } from "@/shared/helpers";
import { mocks } from "@/shared/mocks";
import { Card, CardContent, CardFooter } from "@/shared/ui";
import Image from "next/image";
import { ICON_SIZE } from "./constants";
import { Timer } from "lucide-react";
import { DocumentButtons, DownloadButton, DocumentHeader, DocumentParams } from "./ui";

const document = mocks.document;

export function DocumentInfo() {
    const iconPath = getDocumentIcon(document.title);

    return (
        <Card className="w-[600px] flex-row! justify-between items-start">
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

                    <div className="space-y-2">
                        <DocumentButtons />

                        <DownloadButton />
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}
