import { ConfigService } from "@nestjs/config";
import { GrpcOptions, Transport } from "@nestjs/microservices";
import {
    DOCUMENTS_PACKAGE_NAME,
    NOTIFICATIONS_PACKAGE_NAME,
    ORGANIZATIONS_PACKAGE_NAME,
    USERS_PACKAGE_NAME,
    WORKFLOWS_PACKAGE_NAME
} from "../grpc";
import { join } from "path";

const GrpcInfo = {
    [USERS_PACKAGE_NAME]: {
        packageName: USERS_PACKAGE_NAME,
        urlEnvVariable: "USERS_MICROSERVICE_GRPC_URL",
        protoFile: "users.proto"
    },
    [DOCUMENTS_PACKAGE_NAME]: {
        packageName: DOCUMENTS_PACKAGE_NAME,
        urlEnvVariable: "DOCUMENTS_MICROSERVICE_GRPC_URL",
        protoFile: "documents.proto"
    },
    [NOTIFICATIONS_PACKAGE_NAME]: {
        packageName: NOTIFICATIONS_PACKAGE_NAME,
        urlEnvVariable: "NOTIFICATIONS_MICROSERVICE_GRPC_URL",
        protoFile: "notifications.proto"
    },
    [ORGANIZATIONS_PACKAGE_NAME]: {
        packageName: ORGANIZATIONS_PACKAGE_NAME,
        urlEnvVariable: "ORGANIZATIONS_MICROSERVICE_GRPC_URL",
        protoFile: "organizations.proto"
    },
    [WORKFLOWS_PACKAGE_NAME]: {
        packageName: WORKFLOWS_PACKAGE_NAME,
        urlEnvVariable: "WORKFLOWS_MICROSERVICE_GRPC_URL",
        protoFile: "workflows.proto"
    }
};

export function getGrpcConfig(configService: ConfigService, packageName: keyof typeof GrpcInfo): GrpcOptions {
    const grpcInfo = GrpcInfo[packageName];

    return {
        transport: Transport.GRPC,
        options: {
            protoPath: join(__dirname, "../", grpcInfo.protoFile),
            package: grpcInfo.packageName,
            url: configService.getOrThrow<string>(grpcInfo.urlEnvVariable)
        }
    };
}
