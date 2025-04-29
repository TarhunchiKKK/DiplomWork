import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NOTIFICATIONS_RMQ_SERVICE } from "common/rabbitmq/constants";
import { IRmqEvent } from "common/rabbitmq/events/interfaces";

@Injectable()
export class NotificationsRmqService {
    public constructor(@Inject(NOTIFICATIONS_RMQ_SERVICE) private readonly client: ClientProxy) {}

    public emit(event: IRmqEvent) {
        this.client.emit(event.pattern, event);
    }
}
