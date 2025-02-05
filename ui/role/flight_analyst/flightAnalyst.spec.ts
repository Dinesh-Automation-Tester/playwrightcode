import {MongoClient} from "mongodb";
import {expect, test} from "@playwright/test";
import OverviewGridFunctionality from "./flightAnalyst.po";
import {ROUTES_HOME} from "../../../../src/utils/Constants";
import usersMock from "../../fixtures/admin/user-management/users";

test.describe("Administration Admin Module", () => {
    test.beforeEach(async ({page}) => {
        const client = new MongoClient("mongodb://127.0.0.1:27017");
        await client.connect();
        const db = client.db("RX_Web");
        const collection = db.collection("User");
        await collection.updateOne(
            {userName: "sg000000"},
            {$set: {roles: ["ROLE_FLIGHT_ANALYST"]}}
        );
        await page.goto(ROUTES_HOME);
        await page.waitForLoadState("networkidle");
        await page.route("*/**/api/cro/admin/users", async (route) => {
            await route.fulfill({json: usersMock});
        });
    });

    test.skip("Flight Overview Data Grid", () => {

        test(" should verify the tittle visibility for flight analyst access", async ({page,}) => {
            const gridPO = new OverviewGridFunctionality(page);
            expect(await gridPO.flightTittle.isVisible()).toBe(true);
            expect(await gridPO.marketTittle.isHidden()).toBe(true);
            expect(await gridPO.rulesTittle.isHidden()).toBe(true);
            expect(await gridPO.adminTittle.isHidden()).toBe(true);
            expect(await gridPO.overViewTab.isVisible()).toBe(true);
            expect(await gridPO.analysisTab.isVisible()).toBe(true);
        });

        test("Should verify the columns are editable or not ", async ({page,}) => {
            const gridPO = new OverviewGridFunctionality(page);
            await gridPO.removeDefaultLeg.click();
            await gridPO.applyButton.click();
            expect(await gridPO.userEditOption.isEditable()).toBe(true);
        });
    });
});
