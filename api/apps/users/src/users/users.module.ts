import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { CryptoModule } from "common/modules";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [TypeOrmModule.forFeature([User]), CryptoModule, NotificationsRmqModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
