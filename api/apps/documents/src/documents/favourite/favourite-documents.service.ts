import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FavouriteDocumentInfo } from "./entities/favourite-document-info.entity";
import { Repository } from "typeorm";
import { IAddToFavouriteDto, IFindFavouriteDocumentsDto, IRemoveFromFavouriteDto } from "common/grpc";
import { getShortDocumentData } from "../helpers/documents.helpers";

@Injectable()
export class FavouriteDocumentsService {
    public constructor(
        @InjectRepository(FavouriteDocumentInfo)
        private readonly favouriteDocumentsRepository: Repository<FavouriteDocumentInfo>
    ) {}

    public async add(dto: IAddToFavouriteDto) {
        await this.favouriteDocumentsRepository.save({
            userId: dto.userId,
            document: {
                id: dto.documentId
            }
        });
    }

    public async findAll(dto: IFindFavouriteDocumentsDto) {
        const documentsInfo = await this.favouriteDocumentsRepository.find({
            where: {
                userId: dto.userId
            },
            relations: {
                document: true
            }
        });

        const documents = documentsInfo.map(info => info.document);

        return {
            documents: documents.map(getShortDocumentData)
        };
    }

    public async remove(dto: IRemoveFromFavouriteDto) {
        const documentInfo = await this.favouriteDocumentsRepository.findOne({
            where: {
                userId: dto.userId,
                document: {
                    id: dto.documentId
                }
            },
            relations: {
                document: true
            }
        });

        if (!documentInfo) {
            await this.favouriteDocumentsRepository.delete(documentInfo.id);
        }
    }
}
