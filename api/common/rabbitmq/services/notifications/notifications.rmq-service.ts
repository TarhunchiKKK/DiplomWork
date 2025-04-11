import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NOTIFICATIONS_RMQ_SERVICE } from "common/rabbitmq/constants";
import { BaseRmqEvent } from "common/rabbitmq/events/base-rmq-event";

@Injectable()
export class NotificationsRmqService {
    public constructor(@Inject(NOTIFICATIONS_RMQ_SERVICE) private readonly client: ClientProxy) {}

    public emit(event: BaseRmqEvent) {
        this.client.emit(event.pattern, event);
    }
}
