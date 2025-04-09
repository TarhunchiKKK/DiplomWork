import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { CryptoModule, TokensModule } from "common/modules";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [TypeOrmModule.forFeature([User]), CryptoModule, TokensModule, NotificationsRmqModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
