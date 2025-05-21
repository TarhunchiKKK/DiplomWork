import { Injectable } from "@nestjs/common";
import { UserInvitationTokensService } from "common/modules";
import { UsersService } from "../users/users.service";
import { IConfirmInvitationDto, IInviteUsersDto } from "common/grpc";
import { AccountStatus, Role } from "common/enums";
import { AuthenticationService } from "../authentiation/authentiation.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UsersInvitedEvent } from "./events/users-invited.event";

@Injectable()
export class InvitationsService {
    public constructor(
        private readonly usersService: UsersService,

        private readonly authenticationService: AuthenticationService,

        private readonly invitationTokensService: UserInvitationTokensService,

        private readonly eventEmitter: EventEmitter2
    ) {}

    public async send(dto: IInviteUsersDto): Promise<void> {
        const users = await Promise.all(
            dto.emails.map(email =>
                this.usersService.save({
                    organizationId: dto.organizationId,
                    email: email,
                    role: Role.USER
                })
            )
        );

        this.eventEmitter.emit(
            UsersInvitedEvent.PATTERN,
            new UsersInvitedEvent(
                users.map(user => user.id),
                dto.adminEmail
            )
        );
    }

    public async confirmInvitation(dto: IConfirmInvitationDto) {
        const { id } = this.invitationTokensService.verify(dto.token);

        const user = await this.usersService.update(id, {
            username: dto.username,
            password: dto.password,
            status: AccountStatus.INVITED
        });

        return this.authenticationService.createAuthResponse(user);
    }
}
