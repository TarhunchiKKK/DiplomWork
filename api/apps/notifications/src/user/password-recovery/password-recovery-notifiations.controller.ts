import { Controller } from "@nestjs/common";
import { PasswordRecoveryNotificationsService } from "./password-recovery-notifiations.service";
import { EventPattern } from "@nestjs/microservices";
import { PasswordResetedRmqEvent } from "common/rabbitmq";

@Controller()
export class PasswordRecoveryNotificationsController {
    public constructor(private readonly notificationsService: PasswordRecoveryNotificationsService) {}

    @EventPattern(PasswordResetedRmqEvent.PATTERN)
    public handlePasswordReseted(event: PasswordResetedRmqEvent) {
        this.notificationsService.handlePasswordReseted(event);
    }
}
