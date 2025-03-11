import { ConfigService } from "@nestjs/config";
import { GrpcInfo } from "../constants";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";

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
