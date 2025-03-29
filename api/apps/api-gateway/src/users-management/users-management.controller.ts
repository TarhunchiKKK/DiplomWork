import { Controller } from "@nestjs/common";
import { UsersManagementGrpcService } from "common/grpc";

@Controller("users")
export class UsersManagementController {
    public constructor(private readonly usersManagementGrpcService: UsersManagementGrpcService) {}
}
