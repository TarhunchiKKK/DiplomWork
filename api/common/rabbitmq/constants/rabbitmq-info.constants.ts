import { NOTIFICATIONS_RMQ_SERVICE } from "./services.constants";
import { NOTIFICATIONS_RMQ_QUEUE } from "./queues.constants";

export const RabbitMqInfo = {
    [NOTIFICATIONS_RMQ_SERVICE]: {
        queue: NOTIFICATIONS_RMQ_QUEUE
    }
};
