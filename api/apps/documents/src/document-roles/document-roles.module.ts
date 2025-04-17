import { Module } from "@nestjs/common";
import { DocumentRolesService } from "./document-roles.service";

@Module({
    imports: [],
    providers: [DocumentRolesService],
    exports: [DocumentRolesService]
})
export class DocumentRolesModule {}
