import { IsOptional, IsString } from "class-validator";
import { NotificationStatus } from "common/enums/notifications";
import { IUpdateNotificationDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpdateNotificationDto implements IgnoreFields<IUpdateNotificationDto, "id"> {
    @IsOptional()
    @IsString({ message: "Статус должен быть строкой" })
    public status?: NotificationStatus;
}
