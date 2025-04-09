import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NOTIFICATIONS_RMQ_SERVICE } from "common/rabbitmq/constants";
import { UserInvitationEvent } from "common/rabbitmq/events/notifications";

@Injectable()
export class NotificationsRmqService {
    public constructor(@Inject(NOTIFICATIONS_RMQ_SERVICE) private readonly client: ClientProxy) {}

    public userInvitation(event: UserInvitationEvent) {
        this.client.emit(UserInvitationEvent.PATTERN, event);
    }
}
