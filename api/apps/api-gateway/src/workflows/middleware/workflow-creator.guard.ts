import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WorkflowsGrpcService } from "common/grpc";
import { ExtractFromRequest } from "common/middleware";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WorkflowCreatorGuard implements CanActivate {
    public constructor(
        private readonly workflowsGrpcService: WorkflowsGrpcService,

        private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.exractRequestData(context);

        const workflow = await firstValueFrom(
            this.workflowsGrpcService.call("findOneById", {
                id: requestData.workflowId
            })
        );

        if (workflow.creatorId !== requestData.userId) {
            throw new UnauthorizedException("У вас недостаточно прав");
        }

        return true;
    }

    private exractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const userId = request.jwtInfo.id as string;

        if (!request.userId) {
            throw new UnauthorizedException("Недостаточно прав");
        }

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const workflowId = extractFromRequest(request) as string | null;

        if (workflowId) {
            throw new NotFoundException("Маршрут не найден");
        }

        return { userId, workflowId };
    }
}
