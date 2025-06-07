import { environment } from "../config";

export class SymmetricEncryptionService {
    private static readonly key = this.hexToUint8Array(environment.symmetricEncryptionKey).buffer as ArrayBuffer;

    private static algoritmOptions = {
        name: "AES-GCM",
        iv: this.hexToUint8Array(environment.symmetricEncryptionIv).buffer as ArrayBuffer
    };

    private static hexToUint8Array(hex: string): Uint8Array {
        return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    }

    private static async importSymmetricKey() {
        return await window.crypto.subtle.importKey("raw", this.key, "AES-GCM", false, ["encrypt", "decrypt"]);
    }

    public static async encrypt(file: File) {
        const [fileBuffer, importedKey] = await Promise.all([file.arrayBuffer(), this.importSymmetricKey()]);

        return await window.crypto.subtle.encrypt(this.algoritmOptions, importedKey, fileBuffer);
    }

    public static async decrypt(file: ArrayBuffer) {
        const importedKey = await this.importSymmetricKey();

        return await window.crypto.subtle.decrypt(this.algoritmOptions, importedKey, file);
    }
}
