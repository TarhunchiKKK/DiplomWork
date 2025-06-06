import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IRmqEvent } from "common/rabbitmq/events/interfaces";
import { INJECTION_TOKEN } from "./constants";

@Injectable()
export class RmqClient {
    public constructor(@Inject(INJECTION_TOKEN) private readonly client: ClientProxy) {}

    public emit(event: IRmqEvent) {
        this.client.emit(event.constructor["PATTERN"], event);
    }
}
