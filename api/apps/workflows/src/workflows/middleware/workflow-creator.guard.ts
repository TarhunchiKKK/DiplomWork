import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExtractFromRequest } from "common/middleware";
import { WorkflowsService } from "../workflows.service";

@Injectable()
export class WorkflowCreatorGuard implements CanActivate {
    public constructor(
        private readonly workflowsService: WorkflowsService,

        private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.exractRequestData(context);

        const workflow = await this.workflowsService.findOneById(requestData.workflowId);

        if (workflow.creatorId !== requestData.userId) {
            throw new UnauthorizedException("У вас недостаточно прав");
        }

        return true;
    }

    private exractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const requestData = extractFromRequest(request) as { workflowId: string; userId: string };

        if (!requestData.userId) {
            throw new UnauthorizedException("Недостаточно прав");
        } else if (!requestData.workflowId) {
            throw new NotFoundException("Маршрут не найден");
        }

        return requestData;
    }
}
