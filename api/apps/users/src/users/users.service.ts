import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import {
    IAuthResponse,
    IConfirmInvitationDto,
    ICreateUserDto,
    ICreateUserResponse,
    IInviteUsersDto
} from "common/grpc";
import { Role } from "common/enums/role.enum";
import { CryptoService, TokensService } from "common/modules";
import { NotificationsRmqService } from "common/rabbitmq";
import { UserInvitationEvent } from "common/rabbitmq/events/notifications";
import { ISaveInvitedUserDto } from "./dto/save-invited-user.dto";
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

    public async create(dto: ICreateUserDto): Promise<ICreateUserResponse> {
        const keys = this.generateAssymetricKeys();

        const user = await this.usersRepository.save({
            ...dto,
            role: dto.role as Role,
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

    public async findAllByOrganizationId(organizationId: string): Promise<User[]> {
        return await this.usersRepository.find({
            where: {
                organizationId
            }
        });
    }

    public async findOneById(userId: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });
    }

    public async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: {
                email
            }
        });
    }

    public async findOneByLogin(login: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: [{ username: login }, { email: login }]
        });

        if (!user) {
            throw new NotFoundException("Неверный логин");
        }

        return user;
    }

    private async saveInvitedUser(dto: ISaveInvitedUserDto): Promise<User> {
        return await this.usersRepository.save({
            ...dto,
            status: AccountStatus.INVITED,
            role: Role.USER
        });
    }

    public async inviteUsers(dto: IInviteUsersDto): Promise<void> {
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
    }

    public async confirmInvitation(dto: IConfirmInvitationDto): Promise<IAuthResponse> {
        const user = await this.usersRepository.findOne({
            where: {
                id: dto.id
            }
        });

        if (user) {
            Object.assign(user, { ...dto, status: AccountStatus.ACTIVE });

            await this.usersRepository.save(user);
        }

        return {
            id: user.id,
            username: user.username ?? dto.username,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            token: this.tokensService.jwt.create(user)
        };
    }
}
