import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workflow } from "./workflows/entities/workflow.entity";
import { WorkflowsModule } from "./workflows/workflows.module";
import { WorkflowParticipant } from "./participants/entities/workflow-participant.entity";
import { WorkflowParticipantsModule } from "./participants/workflow-participants.module";
import { DocumentsGrpcModule } from "common/grpc";

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
                database: configService.getOrThrow<string>("WORKFLOWS_MICROSERVICE_DB_NAME"),
                host: configService.getOrThrow<string>("WORKFLOWS_MICROSERVICE_DB_HOST"),
                port: +configService.getOrThrow<number>("WORKFLOWS_MICROSERVICE_DB_PORT"),
                username: configService.getOrThrow<string>("WORKFLOWS_MICROSERVICE_DB_USER"),
                password: configService.getOrThrow<string>("WORKFLOWS_MICROSERVICE_DB_PASSWORD"),
                synchronize: true,
                entities: [Workflow, WorkflowParticipant]
            })
        }),
        WorkflowsModule,
        WorkflowParticipantsModule,
        DocumentsGrpcModule
    ]
})
export class AppModule {}
