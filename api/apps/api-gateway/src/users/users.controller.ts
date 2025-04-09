import { Controller } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { UsersControllerApi } from "./swagger/users-controller-api.decorator";

@Controller("users")
@UsersControllerApi()
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}
}
