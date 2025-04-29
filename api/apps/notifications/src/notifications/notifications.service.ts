import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { CreateNotificationdto } from "./dto/create-notification.dto";
import { IFindAllNotificationsDto, IUpdateNotificationDto } from "common/grpc";
import { NotificationStatus } from "../../../../common/enums/notifications/notification-status.enum";
import { NotificationSubject } from "../../../../common/enums/notifications/notification-subjects.enum";
import { IgnoreFields } from "common/utils";

@Injectable()
export class NotificationsService {
    public constructor(
        @InjectRepository(Notification)
        private readonly notificcationsRepository: Repository<Notification>
    ) {}

    public async create(dto: CreateNotificationdto) {
        return await this.notificcationsRepository.save(dto);
    }

    public async findAll(dto: IFindAllNotificationsDto) {
        return await this.notificcationsRepository.find({
            where: {
                receiverId: dto.userId,
                status: dto.status as NotificationStatus,
                subject: dto.subject as NotificationSubject
            }
        });
    }

    public async findOne(notificationId: string) {
        const notification = await this.notificcationsRepository.findOne({
            where: {
                id: notificationId
            }
        });

        if (!notification) {
            throw new NotFoundException("Уведомление не найдено");
        }

        return notification;
    }

    public async update(notificationId: string, dto: IgnoreFields<IUpdateNotificationDto, "id">) {
        const notification = await this.findOne(notificationId);

        Object.assign(notification, dto);

        await this.notificcationsRepository.save(notification);
    }

    public async delete(notificationId: string) {
        const notification = await this.findOne(notificationId);

        await this.notificcationsRepository.remove(notification);
    }
}
