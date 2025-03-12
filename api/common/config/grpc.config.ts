import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsProviderAsyncOptions, MicroserviceOptions, Transport } from "@nestjs/microservices";
import { GrpcInfo } from "../grpc";

type GrpcConfigOptions = {
    envVariable: string;

    name: keyof typeof GrpcInfo;

    protoPath: string;
};

export function getGrpcConfig({ envVariable, name, protoPath }: GrpcConfigOptions): ClientsProviderAsyncOptions {
    const grpcInfo = GrpcInfo[name];

    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: grpcInfo.PACKAGE_NAME,
        useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
                protoPath,
                package: grpcInfo.PACKAGE_NAME,
                url: configService.getOrThrow<string>(envVariable)
            }
        })
    };
}

type GrpcMicroserviceConfigOptions = {
    configService: ConfigService;

    name: keyof typeof GrpcInfo;

    protoPath: string;
};

export function getGrpcMicroserviceConfig({
    configService,
    name,
    protoPath
}: GrpcMicroserviceConfigOptions): MicroserviceOptions {
    return {
        transport: Transport.GRPC,
        options: {
            protoPath,
            package: GrpcInfo[name].PACKAGE_NAME,
            url: configService.getOrThrow<string>("GRPC_URL")
        }
    };
}
