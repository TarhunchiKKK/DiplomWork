import { Test, TestingModule } from "@nestjs/testing";
import { OrganizationsManagementController } from "./organizations-management.controller";
import { OrganizationsManagementService } from "./organizations-management.service";

describe("OrganizationsManagementController", () => {
    let organizationsManagementController: OrganizationsManagementController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [OrganizationsManagementController],
            providers: [OrganizationsManagementService]
        }).compile();

        organizationsManagementController = app.get<OrganizationsManagementController>(
            OrganizationsManagementController
        );
    });

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(organizationsManagementController.getHello()).toBe("Hello World!");
        });
    });
});
