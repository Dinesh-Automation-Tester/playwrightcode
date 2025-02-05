import OverlayPo from "../../overlay.po";
import {expect, Locator, Page} from "@playwright/test";

export default class OptimizationPo extends OverlayPo {
    readonly optimizationTab: Locator;
    readonly flightNumber: Locator;
    readonly optimizationStatus: Locator;

    constructor(page: Page) {
        super(page);

        this.optimizationTab = page.locator('#overlay-root #optimization-status');
        this.flightNumber = page.locator('div[role="gridcell"][col-id="flightNumber"]');
        this.optimizationStatus = page.locator('div[role="gridcell"][col-id="status"]');
    }

    async sendOptimizationRequest(): Promise<void> {
        await this.verifySendButton();
    }

    async goToOptimizationTab(): Promise<void> {
        await this.optimizationTab.click();
    }

    async verifyFlightInformation(): Promise<void> {
        let flightNumberText: string;
        await this.flightNumber.nth(0).waitFor({state: 'visible'});
        const count = await this.flightNumber.count();

        if (count < 2) {
            flightNumberText = await this.flightNumber.textContent();
        } else {
            flightNumberText = await this.flightNumber.first().textContent();
        }

        const legHeadlineText = await this.legHeadline.textContent();
        const legHeadlineNumber = legHeadlineText?.match(/\d+/)?.[0];

        expect(flightNumberText).toBe(legHeadlineNumber);
    }

    async verifyFlightOptimizationStatus(optStatus: string[]): Promise<void> {
        let status: string;
        const count = await this.flightNumber.count();

        if (count < 2) {
            status = await this.optimizationStatus.textContent();
        } else {
            status = await this.optimizationStatus.first().textContent();
        }

        if (!status) {
            throw new Error('Optimization status is not available.');
        }

        status = status.trim();
        expect(optStatus).toContain(status);
    }

}
