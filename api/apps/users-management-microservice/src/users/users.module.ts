import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { CryptoModule } from "common/modules";

@Module({
    imports: [TypeOrmModule.forFeature([User]), CryptoModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
