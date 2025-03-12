import { Controller } from "@nestjs/common";
import { UsersManagementService } from "./services/users-management.service";
import { GrpcMethod } from "@nestjs/microservices";
import { SERVICE_NAME } from "./constants";
import { CreateUserDto } from "common/grpc";

@Controller()
export class UsersManagementController {
    public constructor(private readonly usersManagementService: UsersManagementService) {}

    @GrpcMethod(SERVICE_NAME, "Create")
    public async create(dto: CreateUserDto) {
        return await this.usersManagementService.create(dto);
    }
}
