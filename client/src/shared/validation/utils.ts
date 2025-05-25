import { AxiosError } from "axios";
import { TValidationError } from "./types";
import { extractMessagesCount } from "./constants";
import { toast } from "sonner";

export function extractValidationMessages(error: AxiosError<TValidationError>, count: number = extractMessagesCount) {
    const messages = error.response?.data?.message || [];
    return messages.slice(0, count);
}

export function httpErrorHandler(error: AxiosError<TValidationError>) {
    extractValidationMessages(error).forEach(message => {
        toast.error(message);
    });
}
