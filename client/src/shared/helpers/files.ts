const documentExtensionIcons: Record<string, string> = {
    pdf: "/documents/pdf.svg",
    doc: "/documents/word.svg",
    docx: "/documents/word.svg",
    xls: "/documents/excel.svg",
    xlsx: "/documents/excel.svg",
    ppt: "/documents/power-point.svg",
    pptx: "/documents/power-point.svg",
    vsd: "/documents/visio.svg",
    vsdx: "/documents/visio.svg"
};

const unknownDocumentExtensionIcon = "/documents/unknown.svg";

export function getDocumentIcon(documentName: string): string {
    const extension = documentName.split(".")[1];
    return documentExtensionIcons[extension] ?? unknownDocumentExtensionIcon;
}

export function getFileName(documentName: string): string {
    return documentName.split(".")[0];
}

export function getFileExtension(filename: string) {
    const reversedArray = filename.split(".");
    reversedArray.reverse();
    return reversedArray[0];
}
