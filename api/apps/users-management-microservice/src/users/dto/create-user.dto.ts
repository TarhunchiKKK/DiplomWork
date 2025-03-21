import { ICreateUserDto } from "common/grpc";

export class CreateUserDto implements ICreateUserDto {
    username: string;

    email: string;

    password: string;

    role: string;

    organizationId: string;
}
