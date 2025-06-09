import { environment } from "../config";

export class HashingService {
    private static readonly key = this.stringToUint8Array(environment.hashingKey).buffer as ArrayBuffer;

    private static readonly algoritmOptions = {
        name: "HMAC",
        hash: "SHA-256"
    };

    private static stringToUint8Array(str: string): Uint8Array {
        return new TextEncoder().encode(str);
    }

    private static async importHashKey() {
        return await window.crypto.subtle.importKey("raw", this.key, this.algoritmOptions, false, ["sign"]);
    }

    public static async hash(file: File) {
        const [fileBuffer, importedKey] = await Promise.all([file.arrayBuffer(), this.importHashKey()]);

        const hash = await window.crypto.subtle.sign(this.algoritmOptions, importedKey, fileBuffer);

        return Array.from(new Uint8Array(hash))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    }
}
