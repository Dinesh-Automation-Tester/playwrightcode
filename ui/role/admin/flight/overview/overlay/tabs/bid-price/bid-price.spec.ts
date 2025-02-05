import BidPricePo from "./bid-price.po";
import {test, expect} from "@playwright/test";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../../../src/utils/Constants";

let bidPricePo: BidPricePo;

test.describe.skip("Bid-Price Tab", () => {

    test.beforeEach(async ({page}) => {
        bidPricePo = new BidPricePo(page);
        await page.goto(ROUTES_FLIGHT_OVERVIEW);
        await bidPricePo.openOverlay();
        await bidPricePo.goToBidPriceTab();
    });

    test('Verify chart metrics display', async () => {
        await bidPricePo.verifyChartLoaded();
        expect(await bidPricePo.expectedBookings.isVisible()).toBeTruthy();
        expect(await bidPricePo.expectedRevenue.isVisible()).toBeTruthy();
        expect(await bidPricePo.expectedSF.isVisible()).toBeTruthy();
        expect(await bidPricePo.effectiveCapacity.isVisible()).toBeTruthy();
        expect(await bidPricePo.AU.isVisible()).toBeTruthy();
    });

    test('Verify Cabin Toggle Default Selection', async () => {
        await bidPricePo.verifyCabinToggleDefaultSelection();
    });

    test('Verify Ability to Switch Between Cabins', async () => {
        await bidPricePo.switchToCabin();
    });

    test.skip('Verify chart axes labels', async () => {
        await bidPricePo.verifyChartAxisTitle('Seats', 'Bid price (SAR)');
    });

    test('Verify flight legend functionality', async () => {
        await bidPricePo.verifyLegendFunctionality();
    });

    test.skip('Check Flight Information Display correctly at the bottom of the chart.', async () => {
        await bidPricePo.verifyFlightInformation();
    });

});
