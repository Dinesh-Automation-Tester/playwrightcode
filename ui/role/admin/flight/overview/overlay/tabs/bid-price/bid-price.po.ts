import OverlayPo from "../../overlay.po";
import {Locator, Page, expect} from "@playwright/test";

export default class BidPricePo extends OverlayPo {
    readonly bidPriceTab: Locator;
    readonly expectedBookings: Locator;
    readonly expectedRevenue: Locator;
    readonly expectedSF: Locator;
    readonly effectiveCapacity: Locator;
    readonly AU: Locator;
    readonly toggleY: Locator;
    readonly cabinToggle: Locator;
    readonly cabinToggleC: Locator;
    readonly cabinToggleY: Locator;
    readonly chartContainer: Locator;
    readonly yAxisTitle: Locator;
    readonly xAxisTitle: Locator;
    readonly chartLine: Locator;
    readonly flightLegendBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.bidPriceTab = page.locator('#bid-price');
        this.expectedBookings = page.locator('.spark-flex.spark-full-width .spark-bold').nth(0);
        this.expectedRevenue = page.locator('.spark-flex.spark-full-width .spark-bold').nth(1);
        this.expectedSF = page.locator('.spark-flex.spark-full-width .spark-bold').nth(2);
        this.effectiveCapacity = page.locator('.spark-flex.spark-full-width .spark-bold').nth(3);
        this.AU = page.locator('.spark-flex.spark-full-width .spark-bold').nth(4);
        this.cabinToggle = page.locator('[data-testid="cabin-toggle"]');
        this.cabinToggleC = page.locator('input[name="cabin-selectors-toggle-bid-price-cabin-toggle"][value="C"]');
        this.cabinToggleY = page.locator('input[name="cabin-selectors-toggle-bid-price-cabin-toggle"][value="Y"]');
        this.toggleY = page.locator('label span.spark-label:text("Y")');
        this.chartContainer = page.locator('.spark-flex.spark-full-width');
        this.yAxisTitle = page.locator('.highcharts-axis-title').nth(1);
        this.xAxisTitle = page.locator('.highcharts-axis-title').nth(0);
        this.chartLine = page.locator('.highcharts-tracker-line[fill=\'none\']');
        this.flightLegendBtn = page.locator('.highcharts-legend-item > span')
    }

    async goToBidPriceTab(): Promise<void> {
        await this.bidPriceTab.click();
    }

    async verifyChartLoaded(): Promise<void> {
        await this.expectedBookings.waitFor({state: 'visible'});
        await this.expectedRevenue.waitFor({state: 'visible'});
        await this.expectedSF.waitFor({state: 'visible'});
        await this.effectiveCapacity.waitFor({state: 'visible'});
        await this.AU.waitFor({state: 'visible'});

    }

    async verifyCabinToggleDefaultSelection(): Promise<void> {
        const isCSelected = await this.cabinToggleC.isChecked();
        const isYSelected = await this.cabinToggleY.isChecked();
        expect(isCSelected).toBe(true);
        expect(isYSelected).toBe(false)
    }

    async switchToCabin(): Promise<void> {
        await this.toggleY.click();

        const isCSelected = await this.cabinToggleC.isChecked();
        const isYSelected = await this.cabinToggleY.isChecked();

        expect(isCSelected).toBe(false);
        expect(isYSelected).toBe(true);
    }

    async verifyChartAxisTitle(xAxis: string, yAxis: string): Promise<void> {
        const x = await this.xAxisTitle.textContent()
        const y = await this.yAxisTitle.textContent();

        expect(x).toContain(xAxis);
        expect(y).toContain(yAxis);
    }

    async verifyLegendFunctionality(): Promise<void> {
        if(await this.chartLine.isVisible()){
            await this.flightLegendBtn.click();
            expect(await this.chartLine.isVisible()).toBeFalsy();
        }
    }

    async verifyFlightInformation(): Promise<void> {
        const flightLegendText = await this.flightLegendBtn.textContent();
        const legHeadlineText = await this.legHeadline.textContent();

        const flightLegendNumber = flightLegendText?.match(/\d+/)?.[0];
        const legHeadlineNumber = legHeadlineText?.match(/\d+/)?.[0];

        expect(flightLegendNumber).toBe(legHeadlineNumber);

    }
}
