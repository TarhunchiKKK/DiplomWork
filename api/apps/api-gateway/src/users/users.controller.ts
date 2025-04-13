import { Controller } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";

@Controller("users")
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}
}

//statusCode message
