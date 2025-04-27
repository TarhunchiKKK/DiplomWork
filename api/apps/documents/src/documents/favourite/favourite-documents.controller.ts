import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    DocumentsServiceControllerMethods,
    FavouriteDocumentsServiceController,
    GrpcExceptionFilter,
    IAddToFavouriteDto,
    IOnlyId,
    IRemoveFromFavouriteDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { FavouriteDocumentsService } from "./favourite-documents.service";

@Controller()
@DocumentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class FavouriteDocumentsController implements UnwrapGrpcResponse<FavouriteDocumentsServiceController> {
    public constructor(private readonly favouriteDocumentsService: FavouriteDocumentsService) {}

    public async add(dto: IAddToFavouriteDto) {
        await this.favouriteDocumentsService.add(dto);
    }

    public async findAll(dto: IOnlyId) {
        return await this.favouriteDocumentsService.findAll(dto.id);
    }

    public async remove(dto: IRemoveFromFavouriteDto) {
        await this.favouriteDocumentsService.remove(dto);
    }
}
