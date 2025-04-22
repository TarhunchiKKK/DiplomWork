import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";

@Injectable()
export class NotificationsService {
    public constructor(
        @InjectRepository(Notification)
        private readonly notificcationsRepository: Repository<Notification>
    ) {}
}
