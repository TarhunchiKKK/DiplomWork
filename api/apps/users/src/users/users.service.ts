import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Role } from "common/enums/role.enum";
import { CryptoService } from "common/modules";
import { AccountStatus } from "./enums/account-status.enum";
import { IUpdateUserDto } from "./dto/update-user.dto";
import { ISaveUserDto } from "./dto/save-user.dto";

@Injectable()
export class UsersService {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,

        private readonly cryptoService: CryptoService
    ) {}

    private generateAssymetricKeys() {
        return this.cryptoService.generateAssymetricKeys();
    }

    public async create(dto: ISaveUserDto) {
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

    public async save(dto: ISaveUserDto): Promise<User> {
        return await this.usersRepository.save(dto);
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

    public async update(id: string, dto: IUpdateUserDto) {
        const user = await this.usersRepository.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new NotFoundException("Пользователь не найден");
        }

        Object.assign(user, { ...dto, status: AccountStatus.ACTIVE });

        await this.usersRepository.save(user);

        return user;
    }
}
