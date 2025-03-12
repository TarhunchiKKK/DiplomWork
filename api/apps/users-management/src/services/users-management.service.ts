import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "common/grpc";
import { PrismaService } from "./prisma.service";
import { Role } from "apps/users-management/prisma/generated";

@Injectable()
export class UsersManagementService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async create(dto: CreateUserDto) {
        await this.prismaService.user.create({
            data: {
                ...dto,
                role: dto.role as Role
            }
        });
    }
}
