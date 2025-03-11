import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import {} from "prisma";

type ClassConstructor<T> = new (...args: any[]) => T;

type PrismaClient = {
    $connect: () => Promise<unknown>;

    $disconnect: () => Promise<unknown>;
};

export function withPrismaService<C extends ClassConstructor<PrismaClient>>(Class: C) {
    return class extends Class implements OnModuleInit, OnModuleDestroy {
        public async onModuleInit() {
            await this.$connect();
        }

        public async onModuleDestroy() {
            await this.$disconnect();
        }
    };
}
