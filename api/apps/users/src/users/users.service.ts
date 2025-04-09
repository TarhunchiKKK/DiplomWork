import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ICreateUserResponse } from "common/grpc";
import { Role } from "common/enums/role.enum";
import { CryptoService, TokensService } from "common/modules";
import { CreateUserDto } from "./dto/create-user.dto";
import { InviteUsersDto } from "./dto/invite-users.dto";
import { NotificationsRmqService } from "common/rabbitmq";
import { UserInvitationEvent } from "common/rabbitmq/events/notifications";
import { SaveInvitedUserDto } from "./dto/save-invited-user.dto";
import { AccountStatus } from "./enums/account-status.enum";

@Injectable()
export class UsersService {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,

        private readonly cryptoService: CryptoService,

        private readonly notificationsRmqService: NotificationsRmqService,

        private readonly tokensService: TokensService
    ) {}

    private generateAssymetricKeys() {
        return this.cryptoService.generateAssymetricKeys();
    }

    public async create(dto: CreateUserDto): Promise<ICreateUserResponse> {
        const keys = this.generateAssymetricKeys();

        const user = await this.usersRepository.save({
            ...dto,
            status: AccountStatus.ACTIVE,
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

    public async saveInvitedUser(dto: SaveInvitedUserDto) {
        return await this.usersRepository.save({
            ...dto,
            status: AccountStatus.INVITED,
            role: Role.USER
        });
    }

    public async inviteUsers(dto: InviteUsersDto) {
        const storedUsers = await Promise.all(
            dto.emails.map(email =>
                this.saveInvitedUser({
                    organizationId: dto.organizationId,
                    email: email
                })
            )
        );

        storedUsers.forEach(user =>
            this.notificationsRmqService.userInvitation(
                new UserInvitationEvent(dto.adminEmail, user.email, this.tokensService.userInvitation.create(user))
            )
        );
        console.log("End");
    }
}
