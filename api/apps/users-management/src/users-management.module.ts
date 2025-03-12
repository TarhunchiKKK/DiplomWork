import { Module } from "@nestjs/common";
import { UsersManagementController } from "./users-management.controller";
import { UsersManagementService } from "./services/users-management.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfigModuleConfig, getJwtConfig } from "common/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/users/entities/user.entity";
import { Token } from "./modules/tokens/entities/token.entity";
import { UsersModule } from "./modules/users/users.module";
import { TokensModule } from "./modules/tokens/tokens.module";
import { PostsModule } from "./modules/posts/posts.module";
import { Post } from "./modules/posts/entities/post.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot(getConfigModuleConfig()),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                database: configService.getOrThrow<string>("USERS_MANAGEMENT_MICROSERVICE_DB_NAME"),
                host: configService.getOrThrow<string>("USERS_MANAGEMENT_MICROSERVICE_DB_HOST"),
                port: +configService.getOrThrow<number>("USERS_MANAGEMENT_MICROSERVICE_DB_PORT"),
                username: configService.getOrThrow<string>("USERS_MANAGEMENT_MICROSERVICE_DB_USER"),
                password: configService.getOrThrow<string>("USERS_MANAGEMENT_MICROSERVICE_DB_PASSWORD"),
                synchronize: true,
                entities: [User, Token, Post]
            })
        }),
        UsersModule,
        TokensModule,
        PostsModule
    ],
    controllers: [UsersManagementController],
    providers: [UsersManagementService]
})
export class UsersManagementModule {}
