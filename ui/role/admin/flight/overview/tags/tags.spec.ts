import {test} from "@playwright/test";
import {TagsSection} from "./tags.po";
import flightsJSON from "../../../../../fixtures/admin/flight-response";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../src/utils/Constants";

test.describe("Flight Tags Functionality", () => {
    test.beforeEach(async ({page}) => {
        await page.route(
            "*/**/api/cro/flights?filter=departureDate*",
            async (route) => {
                await route.fulfill({json: flightsJSON});
            }
        );

        await page.goto(ROUTES_FLIGHT_OVERVIEW);
    });

    test("Displays the tags section upon applying filters", async ({page}) => {
        const tags = new TagsSection(page);
        await tags.clickApplyButton();
        await tags.checkIfTagsVisible();
    });

    test("Renders all eight tags correctly", async ({page}) => {
        const tags = new TagsSection(page);
        await tags.clickApplyButton();
        await tags.shouldRenderAllTags();
    });

    test("Updates grid data appropriately when a tag is selected", async ({
                                                                              page,
                                                                          }) => {
        const tags = new TagsSection(page);
        await tags.clickApplyButton();
        await tags.shouldVerifyChangesOnTagClick();
    });
});
