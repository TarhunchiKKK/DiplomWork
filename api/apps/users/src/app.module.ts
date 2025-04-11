import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { OrganizationsGrpcModule } from "common/grpc";
import { JwtTokensModule, PasswordRecoveryTokensModule, UserInvitationTokensModule } from "common/modules";
import { InvitationsModule } from "./invitations/invitations.module";
import { PasswordRecoveryModule } from "./password-recovery/password-recovery.module";
import { AccountDeactivationModule } from "./account-deactivation/account-deactivation.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                database: configService.getOrThrow<string>("USERS_MICROSERVICE_DB_NAME"),
                host: configService.getOrThrow<string>("USERS_MICROSERVICE_DB_HOST"),
                port: +configService.getOrThrow<number>("USERS_MICROSERVICE_DB_PORT"),
                username: configService.getOrThrow<string>("USERS_MICROSERVICE_DB_USER"),
                password: configService.getOrThrow<string>("USERS_MICROSERVICE_DB_PASSWORD"),
                synchronize: true,
                entities: [User]
            })
        }),
        JwtTokensModule,
        UserInvitationTokensModule,
        PasswordRecoveryTokensModule,
        OrganizationsGrpcModule,
        UsersModule,
        AuthModule,
        InvitationsModule,
        PasswordRecoveryModule,
        AccountDeactivationModule
    ]
})
export class AppModule {}
