import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ICreateUserResponse } from "common/grpc";
import { Role } from "common/enums/role.enum";
import { CryptoService } from "common/modules";
import { CreateUserDto } from "./dto/create-user.dto";
import { InviteUsersDto } from "./dto/invite-users.dto";
import { NotificationsRmqService } from "common/rabbitmq";
import { UserInvitationEvent } from "common/rabbitmq/events/notifications";

@Injectable()
export class UsersService {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,

        private readonly cryptoService: CryptoService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    public async create(dto: CreateUserDto): Promise<ICreateUserResponse> {
        const keys = this.cryptoService.generateAssymetricKeys();

        const user = await this.usersRepository.save({
            ...dto,
            role: dto.role as Role,
            ...keys
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            organizationId: user.organizationId,
            createdAt: user.createdAt?.toString()
        };
    }

    public async findAllByOrganizationId(organizationId: string) {
        return await this.usersRepository.find({
            where: {
                organizationId
            }
        });
    }

    public async findOneById(userId: string) {
        return await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
    }

    public async findOneByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email
            }
        });
    }

    public async inviteUsers(dto: InviteUsersDto) {
        this.notificationsRmqService.userInvitation(new UserInvitationEvent(dto.adminEmail, dto.emails[0], ""));
    }
}
