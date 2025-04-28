import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcExceptionFilter, WrapGrpcResponseInterceptor } from "common/grpc";
import { ApprovalsService } from "./approvals.service";

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class ApprovalsController {
    public constructor(private readonly approvalsService: ApprovalsService) {}
}
