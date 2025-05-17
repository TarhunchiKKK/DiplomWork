import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    ApprovalsServiceController,
    ApprovalsServiceControllerMethods,
    GrpcExceptionFilter,
    IFindOneApprovalDto,
    IOnlyId,
    IUpsertApprovalDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { ApprovalsService } from "./approvals.service";
import { transformApproval } from "./helpers/grpc.helpers";

@Controller()
@ApprovalsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class ApprovalsController implements UnwrapGrpcResponse<ApprovalsServiceController> {
    public constructor(private readonly approvalsService: ApprovalsService) {}

    public async findOne(dto: IFindOneApprovalDto) {
        return await this.approvalsService.findOne(dto).then(transformApproval);
    }

    public async upsert(dto: IUpsertApprovalDto) {
        return await this.approvalsService.upsert(dto).then(transformApproval);
    }
}
