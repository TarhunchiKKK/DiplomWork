import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    InsertGrpcResponseInterceptor,
    NotificationsServiceController,
    NotificationsServiceControllerMethods
} from "common/grpc";
import { NotificationsService } from "./notifications.service";

@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
    public constructor(private readonly notificationsService: NotificationsService) {}
}
