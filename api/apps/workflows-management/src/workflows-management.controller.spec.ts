import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowsManagementController } from "./workflows-management.controller";
import { WorkflowsManagementService } from "./workflows-management.service";

describe("WorkflowsManagementController", () => {
    let workflowsManagementController: WorkflowsManagementController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [WorkflowsManagementController],
            providers: [WorkflowsManagementService]
        }).compile();

        workflowsManagementController = app.get<WorkflowsManagementController>(WorkflowsManagementController);
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(workflowsManagementController.getHello()).toBe("Hello World!");
        });
    });
});
