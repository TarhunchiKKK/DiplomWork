import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { CreateNotificationdto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationsService {
    public constructor(
        @InjectRepository(Notification)
        private readonly notificcationsRepository: Repository<Notification>
    ) {}

    public async create(dto: CreateNotificationdto) {
        return await this.notificcationsRepository.save(dto);
    }
}
