import { Controller } from "@nestjs/common";
import { UsersManagementGrpcService } from "./users-management.grpc-service";

@Controller("users")
export class UsersManagementGrpcController {
    public constructor(private readonly usersManagementGrpcService: UsersManagementGrpcService) {}
}
