import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "common/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Token } from "./tokens/entities/token.entity";
import { UsersModule } from "./users/users.module";
import { TokensModule } from "./tokens/tokens.module";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/entities/post.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
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
    ]
})
export class UsersManagementMicroserviceModule {}
