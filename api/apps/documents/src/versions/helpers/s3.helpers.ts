import * as uuid from "uuid";

export function generateS3Filename(extension: string) {
    const filename = uuid.v4();
    return `${filename}.${extension}`;
}
