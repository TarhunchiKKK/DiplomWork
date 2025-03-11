import { ConfigService } from "@nestjs/config";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { GrpcInfo } from "../grpc";

interface Options {
    configService: ConfigService;

    microserviceName: keyof typeof GrpcInfo;

    protoPath: string;
}

export function getGrpcConfig({ configService, microserviceName, protoPath }: Options): ClientProviderOptions {
    const grpcInfo = GrpcInfo[microserviceName];

    return {
        name: grpcInfo.PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
            protoPath,
            package: grpcInfo.PACKAGE_NAME,
            url: configService.getOrThrow<string>("GRPC_URL")
        }
    };
}
