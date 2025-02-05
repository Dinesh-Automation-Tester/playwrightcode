import {MongoClient} from "mongodb";
import {expect, test} from "@playwright/test";
import {UserManagementSection} from "./system_owner.po";
import usersMock from "../../fixtures/admin/user-management/users";
import {ROUTES_ADMIN_USER_MANAGEMENT} from "../../../../src/utils/Constants";

test.describe("Administration Admin Module", () => {
    test.beforeEach(async ({page}) => {
        const client = new MongoClient("mongodb://127.0.0.1:27017");
        await client.connect();
        const db = client.db("RX_Web");
        const collection = db.collection("User");
        await collection.updateOne(
            {userName: "sg000000"},
            {$set: {roles: ["ROLE_SYSTEM_OWNER"]}}
        );
        await page.goto(ROUTES_ADMIN_USER_MANAGEMENT);
        await page.waitForLoadState("networkidle");
        await page.route("*/**/api/cro/admin/users", async (route) => {
            await route.fulfill({json: usersMock});
        });
    });

    test.describe("User Management Functionality", () => {

        test.skip("should ensure  markets and legs, edit role, delete user options are available under actions ", async ({
                                                                                                                        page,
                                                                                                                    }) => {
            await page.pause();
            const userManagement = new UserManagementSection(page);
            expect(await userManagement.marketsLegsButton.isVisible()).toBe(true);
            expect(await userManagement.editRoleButtonUser.isHidden()).toBe(true);
            expect(await userManagement.deleteRoleButtonUser.isHidden()).toBe(true);
        });
    });
});
