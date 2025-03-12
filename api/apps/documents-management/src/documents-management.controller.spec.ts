import { Test, TestingModule } from "@nestjs/testing";
import { DocumentsManagementController } from "./documents-management.controller";
import { DocumentsManagementService } from "./documents-management.service";

describe("DocumentsManagementController", () => {
    let documentsManagementController: DocumentsManagementController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DocumentsManagementController],
            providers: [DocumentsManagementService]
        }).compile();

        documentsManagementController = app.get<DocumentsManagementController>(DocumentsManagementController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(documentsManagementController.getHello()).toBe("Hello World!");
        });
    });
});
