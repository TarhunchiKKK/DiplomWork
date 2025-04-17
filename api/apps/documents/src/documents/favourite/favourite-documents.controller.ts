import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    DocumentsServiceController,
    DocumentsServiceControllerMethods,
    GrpcExceptionFilter,
    IAddToFavouriteDto,
    IFindFavouriteDto,
    IRemoveFromFavouriteDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { FavouriteDocumentsService } from "./favourite-documents.service";

type ServiceController = Pick<DocumentsServiceController, "addToFavourite" | "removeFromFavourite" | "findFavourite">;

@Controller()
@DocumentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class FavouriteDocumentsController implements UnwrapGrpcResponse<ServiceController> {
    public constructor(private readonly favouriteDocumentsService: FavouriteDocumentsService) {}

    public async addToFavourite(dto: IAddToFavouriteDto) {
        await this.favouriteDocumentsService.add(dto);
    }

    public async findFavourite(dto: IFindFavouriteDto) {
        return await this.favouriteDocumentsService.findAll(dto);
    }

    public async removeFromFavourite(dto: IRemoveFromFavouriteDto) {
        await this.favouriteDocumentsService.remove(dto);
    }
}
