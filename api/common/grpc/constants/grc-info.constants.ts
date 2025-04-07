import {
    AUTHENTICATION_PACKAGE_NAME,
    AUTHENTICATION_SERVICE_NAME,
    DOCUMENTS_PACKAGE_NAME,
    DOCUMENTS_SERVICE_NAME,
    NOTIFICATIONS_PACKAGE_NAME,
    NOTIFICATIONS_SERVICE_NAME,
    ORGANIZATIONS_PACKAGE_NAME,
    ORGANIZATIONS_SERVICE_NAME,
    USERS_PACKAGE_NAME,
    USERS_SERVICE_NAME,
    WORKFLOWS_PACKAGE_NAME,
    WORKFLOWS_SERVICE_NAME
} from "../generated";

export const GrpcInfo = {
    [AUTHENTICATION_PACKAGE_NAME]: {
        serviceName: AUTHENTICATION_SERVICE_NAME,
        packageName: AUTHENTICATION_PACKAGE_NAME,
        urlEnvVariable: "AUTHENTICATION_MICROSERVICE_GRPC_URL",
        protoFile: "authentication.proto"
    },
    [DOCUMENTS_PACKAGE_NAME]: {
        serviceName: DOCUMENTS_SERVICE_NAME,
        packageName: DOCUMENTS_PACKAGE_NAME,
        urlEnvVariable: "DOCUMENTS_MICROSERVICE_GRPC_URL",
        protoFile: "documents.proto"
    },
    [NOTIFICATIONS_PACKAGE_NAME]: {
        serviceName: NOTIFICATIONS_SERVICE_NAME,
        packageName: NOTIFICATIONS_PACKAGE_NAME,
        urlEnvVariable: "NOTIFICATIONS_MICROSERVICE_GRPC_URL",
        protoFile: "notifications.proto"
    },
    [ORGANIZATIONS_PACKAGE_NAME]: {
        serviceName: ORGANIZATIONS_SERVICE_NAME,
        packageName: ORGANIZATIONS_PACKAGE_NAME,
        urlEnvVariable: "ORGANIZATIONS_MICROSERVICE_GRPC_URL",
        protoFile: "organizations.proto"
    },
    [USERS_PACKAGE_NAME]: {
        serviceName: USERS_SERVICE_NAME,
        packageName: USERS_PACKAGE_NAME,
        urlEnvVariable: "USERS_MICROSERVICE_GRPC_URL",
        protoFile: "users.proto"
    },
    [WORKFLOWS_PACKAGE_NAME]: {
        serviceName: WORKFLOWS_SERVICE_NAME,
        packageName: WORKFLOWS_PACKAGE_NAME,
        urlEnvVariable: "WORKFLOWS_MICROSERVICE_GRPC_URL",
        protoFile: "workflows.proto"
    }
};
