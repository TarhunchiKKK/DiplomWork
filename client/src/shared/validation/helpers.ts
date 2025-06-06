import { AxiosError } from "axios";
import { TValidationError } from "./types";
import { extractMessagesCount } from "./constants";
import { toast } from "sonner";

export function httpErrorHandler(error: AxiosError<TValidationError>) {
    const messages = error.response?.data?.message;

    if (!messages || !Array.isArray(messages)) {
        toast.error("Ошибка");
        return;
    }

    messages.slice(0, extractMessagesCount).forEach(message => {
        toast.error(message);
    });
}
