import { FindManyOptions } from "typeorm";
import { ElectronicDocument } from "../entities/document.entity";
import { IFindDocumentsDto } from "common/grpc";
import * as lodash from "lodash";
import { DocumentSortOrder } from "common/enums";

export class FindDocumentsQueryBuilder {
    private options: FindManyOptions<ElectronicDocument> = {
        where: {},
        order: {}
    };

    public constructor(private dto: IFindDocumentsDto) {}

    public setWhereOptions() {
        const whereOptions = lodash.pick(this.dto, ["aimId", "typeId", "status", "isUrgent", "authorId"]);
        Object.assign(this.options.where, whereOptions);
    }

    public setSortOrder() {
        switch (this.dto.sortOrder as DocumentSortOrder) {
            case DocumentSortOrder.TITLE_ASC:
                this.options.order.title = "ASC";
            case DocumentSortOrder.TITLE_DESC:
                this.options.order.title = "DESC";
            case DocumentSortOrder.CREATED_AT_ASC:
                this.options.order.createdAt = "ASC";
            case DocumentSortOrder.CREATED_AT_DESC:
                this.options.order.createdAt = "DESC";
        }
    }

    public build() {
        this.setWhereOptions();
        this.setSortOrder();
        return this.options;
    }
}
