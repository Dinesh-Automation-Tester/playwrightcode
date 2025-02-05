import OverlayPo from "./overlay.po";
import {test} from "@playwright/test";
import {ROUTES_FLIGHT_ANALYSIS} from "../../../../../../../src/utils/Constants";

let overlayPO: OverlayPo;

test.describe.skip("Overlay Functionality", () => {

    test.beforeEach('Overlay Testing', async ({page}) => {
        overlayPO = new OverlayPo(page);
        await page.goto(ROUTES_FLIGHT_ANALYSIS);

        await overlayPO.openOverlay();
    });

    test.describe("Overlay Header Functionality", () => {

        test("Ensures that the leg overlay is visible and the leg information is correctly displayed.", async ({page}) => {
            await page.pause()
            await overlayPO.verifyLegDetails();
        });

        test("Confirms the 'Next' button is functional and navigates as expected", async () => {
            await overlayPO.verifyNextButton();
        });

        test.skip("Validates the 'Previous' button's functionality and navigation capability", async () => {
            await overlayPO.verifyPreviousButton();
        });

        test("Asserts that the close icon functions correctly and closes the overlay", async () => {
            await overlayPO.verifyCloseButton();
        });

    });

    test.describe("Overlay Tabs Navigation and Content Verification", () => {

        test("Verify that all tabs are clickable and display correct content upon selection", async () => {
            await overlayPO.verifyTabSwitch();
        });

    });

    test.describe("Overlay Action Button Functionality", () => {

        test.skip('Verify that the Manual Toggle button performs its intended function when clicked', async () => {
            await overlayPO.verifyManualToggleButton()
        });

        test('Verify that the Refresh button refreshes the content', async () => {
            await overlayPO.verifyRefreshButton();
        });

        test.skip('Verify that the Send button opens the toaster with successfully sent message', async () => {
            await overlayPO.verifySendButton();
        });
    });

});
