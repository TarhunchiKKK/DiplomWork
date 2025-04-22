import { Controller } from "@nestjs/common";
import { DocumentNotificationsService } from "./document-notifications.service";

@Controller()
export class DocumentNotificationsController {
    public constructor(private readonly notificationsService: DocumentNotificationsService) {}
}
