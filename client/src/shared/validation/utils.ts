import { AxiosError } from "axios";
import { TValidationError } from "./types";
import { extractMessagesCount } from "./constants";

export function extractValidationMessages(error: AxiosError<TValidationError>, count: number = extractMessagesCount) {
    const messages = error.response?.data?.message || [];
    return messages.slice(0, count);
}
