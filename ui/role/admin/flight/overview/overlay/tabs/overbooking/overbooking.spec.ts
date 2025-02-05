import {test} from "@playwright/test";
import OverBookingPo from "./overbooking.po";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../../../src/utils/Constants";

let overBookingPO: OverBookingPo;

test.beforeEach('Overlay', async ({page}) => {
    overBookingPO = new OverBookingPo(page);
    await page.goto(ROUTES_FLIGHT_OVERVIEW);

    await overBookingPO.openOverlay();
});

test.describe("Over-Booking Tab", () => {

    test.describe("Summary Section", () => {

        test("Verify Current and Expected Booking Values", async ({page}) => {
            const currentValueLocator = page.locator('div[role="row"][row-index="3"] div[role="gridcell"][col-id="liveBookings"]');
            const currentValue = await currentValueLocator.first().textContent();

            const expectedValueLocator = page.locator('div[role="row"][row-index="3"] div[role="gridcell"][col-id="expectedNetBookings"]');
            const expectedValue = await expectedValueLocator.first().textContent();

            await overBookingPO.verifySummaryValue('Bookings', currentValue.trim(), expectedValue.trim());
        });
    })

});
