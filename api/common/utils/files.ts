export function splitFilename(filename: string) {
    const lastDotIndex = filename.lastIndexOf(".");
    return [filename.slice(0, lastDotIndex), filename.slice(lastDotIndex + 1)];
}
