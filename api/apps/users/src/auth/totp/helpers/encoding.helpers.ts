import { randomBytes } from "crypto";
import { encode } from "hi-base32";

export function generateTotpSecret() {
    return encode(randomBytes(15)).replace(/=/g, "").substring(0, 24);
}
