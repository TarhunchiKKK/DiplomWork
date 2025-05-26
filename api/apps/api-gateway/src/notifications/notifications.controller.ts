import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    Req,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { NotificationStatus, NotificationSubject } from "common/enums/notifications";
import { NotificationsGrpcService } from "common/grpc";
import { AuthenticationGuard, GatewayExceptionFilter } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Controller("notifications")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class NotificationsController {
    public constructor(private readonly notificationsGrpcService: NotificationsGrpcService) {}

    @Get()
    public async findAll(
        @Req() request: TAuthenticatedRequest,
        @Query("status") status?: NotificationStatus,
        @Query("subject") subject?: NotificationSubject
    ) {
        return this.notificationsGrpcService.call("findAll", {
            userId: request.jwtInfo.id,
            status: status,
            subject: subject
        });
    }

    @Patch(":notificationId")
    @UsePipes(ValidationPipe)
    public async update(@Param("notificationId") notificationId: string, @Body() dto: UpdateNotificationDto) {
        return this.notificationsGrpcService.call("update", {
            ...dto,
            id: notificationId
        });
    }

    @Delete(":notificationId")
    public async delete(@Param("notificationId") notificationId: string) {
        return this.notificationsGrpcService.call("delete", {
            id: notificationId
        });
    }
}
