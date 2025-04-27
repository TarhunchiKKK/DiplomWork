import { Controller } from "@nestjs/common";
import { AccountDeactivationNotificationsService } from "./account-deactivation-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { AccountActivatedRmqEvent, AccountDeactivatedRmqEvent } from "common/rabbitmq";

@Controller()
export class AccountDeactivationNotificationsController {
    public constructor(private readonly notificationsService: AccountDeactivationNotificationsService) {}

    @EventPattern(AccountActivatedRmqEvent.PATTERN)
    public handleAccountActivated(event: AccountActivatedRmqEvent) {
        this.notificationsService.handleAccountActivated(event.payload);
    }

    @EventPattern(AccountDeactivatedRmqEvent.PATTERN)
    public handleAccountDeactivated(event: AccountDeactivatedRmqEvent) {
        this.notificationsService.handleAccountDeactivated(event.payload);
    }
}
