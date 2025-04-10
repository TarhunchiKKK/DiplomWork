import { Injectable } from "@nestjs/common";
import { JwtTokensService, UserInvitationTokensService } from "common/modules";
import { NotificationsRmqService, UserInvitationEvent } from "common/rabbitmq";
import { UsersService } from "../users/users.service";
import { IAuthResponse, IConfirmInvitationDto, IInviteUsersDto } from "common/grpc";

@Injectable()
export class InvitationsService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly notificationsRmqService: NotificationsRmqService,

        private readonly jwtTokensService: JwtTokensService,

        private readonly invitationTokensService: UserInvitationTokensService
    ) {}

    public async send(dto: IInviteUsersDto): Promise<void> {
        const storedUsers = await Promise.all(
            dto.emails.map(email =>
                this.usersService.save({
                    organizationId: dto.organizationId,
                    email: email
                })
            )
        );

        storedUsers.forEach(user =>
            this.notificationsRmqService.userInvitation(
                new UserInvitationEvent(dto.adminEmail, user.email, this.invitationTokensService.create(user))
            )
        );
    }

    public async confirmInvitation(dto: IConfirmInvitationDto): Promise<IAuthResponse> {
        const { token, ...data } = dto;

        const { id } = this.invitationTokensService.verify(token);

        const user = await this.usersService.update(id, data);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId,
            token: this.jwtTokensService.create({
                id: user.id,
                username: user.username as string,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId
            })
        };
    }
}
