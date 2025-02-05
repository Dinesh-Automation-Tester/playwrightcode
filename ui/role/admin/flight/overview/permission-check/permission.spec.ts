import {test} from "@playwright/test";
import {PermissionsOverviewPage} from "./permission.po"
import authJSON from "../../../../../fixtures/admin/authorization";

test.describe("Overview permission check", async () => {
    test("Verifies visibility of the overview section with appropriate permissions", async ({
                                                                                                page,
                                                                                            }) => {
        await page.route("*/**/api/cro/user/authorities", async (route) => {
            await route.fulfill({json: authJSON});
        });

        const permissionsPO = new PermissionsOverviewPage(page);
        await permissionsPO.gotoOverview();
        await permissionsPO.verifyIfOverviewVisible();
    });

    test("Ensures the overview section is not rendered without necessary permissions", async ({
                                                                                                  page,
                                                                                              }) => {
        await page.route("*/**/api/cro/user/authorities", async (route) => {
            await route.fulfill({json: []});
        });

        const permissionsPO = new PermissionsOverviewPage(page);
        await permissionsPO.gotoOverview();
        await permissionsPO.verifyIf401tVisible();
    });
});
