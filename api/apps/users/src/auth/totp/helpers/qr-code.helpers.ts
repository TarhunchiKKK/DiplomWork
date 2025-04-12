import { TOTP } from "otpauth";
import * as QRCode from "qrcode";

export async function createQrCodeFromTotp(totp: TOTP) {
    return await QRCode.toDataURL(totp.toString());
}
