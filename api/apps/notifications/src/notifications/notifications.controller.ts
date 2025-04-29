import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    WrapGrpcResponseInterceptor,
    NotificationsServiceController,
    NotificationsServiceControllerMethods,
    UnwrapGrpcResponse,
    IFindAllNotificationsDto,
    IOnlyId,
    IUpdateNotificationDto
} from "common/grpc";
import { NotificationsService } from "./notifications.service";
import { transfromNotificationsArray } from "./helpers/grpc.helpers";

@Controller()
@NotificationsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class NotificationsController implements UnwrapGrpcResponse<NotificationsServiceController> {
    public constructor(private readonly notificationsService: NotificationsService) {}

    public async findAll(dto: IFindAllNotificationsDto) {
        return await this.notificationsService.findAll(dto).then(transfromNotificationsArray);
    }

    public async update(dto: IUpdateNotificationDto) {
        const { id, ...data } = dto;
        await this.notificationsService.update(id, data);
    }

    public async delete(dto: IOnlyId) {
        await this.notificationsService.delete(dto.id);
    }
}
