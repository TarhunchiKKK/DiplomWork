import { TokenType } from "../enums/token-type.enum";

export const expirationTimes: Record<TokenType, number> = {
    [TokenType.DOCUMENT_ACCESS]: 1 * 30 * 24 * 60 * 60,
    [TokenType.PASSWORD_RECOVRY]: 1 * 60 * 60,
    [TokenType.DEACTIVATE_ACCOUNT]: 1 * 7 * 24 * 60 * 60
};
