import {ProfileSection} from "./profile.po";
import {expect, test} from "@playwright/test";
import {ROUTES_PROFILE} from "../../../../../src/utils/Constants";

test.describe("Administration Module", () => {

    test.beforeEach(async ({page}) => {
        await page.goto(ROUTES_PROFILE);
        await page.waitForLoadState("networkidle");
    });

    test.describe("Profile Functionality", () => {
        test("Profiles page title verifications", async ({page}) => {
            const profileSection = new ProfileSection(page);
            expect(await profileSection.profileHeader.isVisible()).toBe(true);
        });

        test("Profile Cancel button should cancel profile page and should direct to overview page", async ({
                                                                                                               page,
                                                                                                           }) => {
            const profileSection = new ProfileSection(page);
            await profileSection.cancelButton.click();
            await page.waitForTimeout(1000);
            expect(await profileSection.overViewTab.isVisible()).toBe(true);
        });
    });
});
