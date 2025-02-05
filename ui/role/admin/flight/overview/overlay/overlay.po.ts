import dayjs from "dayjs";
import Overview from "../base";
import {expect, Locator, Page} from "@playwright/test";

export default class OverlayPo extends Overview {
    readonly page: Page;
    readonly startDate: Locator;
    readonly applyButton: Locator;
    readonly overlay: Locator;
    readonly legOverlayLink: Locator;
    readonly legHeadline: Locator;
    readonly nextButton: Locator;
    readonly previousButton: Locator;
    readonly closeButton: Locator;
    readonly tabsList: Locator;
    readonly activeTab: Locator;
    readonly activeTabContent: Locator;
    readonly manualToggleButton: Locator;
    readonly toasterHeading: Locator;
    readonly sendButton: Locator;
    readonly refreshButton: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;

        this.startDate = page.locator('input[aria-label="Start day"]')
        this.applyButton = page.locator('nav.spark-btn-group button:has-text("Apply")');
        this.overlay = page.locator("div.overlay");
        this.legOverlayLink = page.locator(".css-z7n7pm .css-1i6l3d5");
        this.legHeadline = page.locator('.col-xs-8 h2');
        this.previousButton = page.locator(".cro-prev");
        this.nextButton = page.locator('.cro-next');
        this.closeButton = page.locator(".cro-overlay-close");
        this.tabsList = page.locator("#overlay-root .spark-tabs__tab");
        this.activeTab = page.locator("#overlay-root .spark-tabs__tab.active")
        this.activeTabContent = page.locator(".spark-panel__content h3");
        this.manualToggleButton = page.locator('#overlay-root .spark-toggle-switch');
        this.toasterHeading = page.locator('.spark-toast__heading');
        this.sendButton = page.locator('#overlay-root .spark-icon-paper-airplane');
        this.refreshButton = page.locator('button[aria-label=\'Refresh\']');

    }

    async goToNextDate(): Promise<void> {
        await this.startDate.waitFor({state: 'visible'});
        const currentValue = await this.startDate.inputValue();
        const today = dayjs();
        const currentDate = today.date(parseInt(currentValue, 10));
        const nextDate = currentDate.add(1, 'day').format('DD');

        await this.startDate.fill(nextDate);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500);

        await this.applyButton.click();
    }

    async getLegCount(): Promise<number> {
        return await this.legOverlayLink.count();
    }

    async openOverlay(): Promise<void> {
        await this.goToNextDate()
        await this.legOverlayLink.first().click();
    }

    async verifyLegDetails(): Promise<void> {
        const legName = await this.legOverlayLink.first().textContent();
        const trimmedLegName = legName.trim();
        expect(trimmedLegName).toBe(trimmedLegName);
    }

    async verifyNextButton(): Promise<void> {
        const count = await this.getLegCount()
        if (count > 3) {
            const currentLegName = await this.legHeadline.textContent();
            await this.nextButton.click();
            const nextLegName = await this.legHeadline.textContent();

            const trimmedCurrentLegName = currentLegName.trim();
            const trimmedNextLegName = nextLegName.trim();

            expect(trimmedCurrentLegName).not.toBe(trimmedNextLegName);
        } else {
            return;
        }
    }

    async verifyPreviousButton(): Promise<void> {
        const count = await this.getLegCount()
        if (count > 3) {
            const currentLegName = await this.legHeadline.textContent();
            await this.nextButton.click();
            await this.previousButton.click();
            const prevLegName = await this.legHeadline.textContent();

            const trimmedCurrentLegName = currentLegName.trim();
            const trimmedPrevLegName = prevLegName.trim();

            expect(trimmedCurrentLegName).toBe(trimmedPrevLegName);
        } else {
            return;
        }
    }

    async verifyCloseButton(): Promise<void> {
        await this.closeButton.click();
        const isOverlayVisible = await this.overlay.isVisible();
        expect(isOverlayVisible).toBeFalsy();
    }

    async verifyTabSwitch(): Promise<void> {
        const tabCount = await this.tabsList.count();

        for (let i = 0; i < tabCount; i++) {
            const tab = this.tabsList.nth(i);
            await tab.click();

            const activeTabText = await tab.evaluate(el => el.textContent);
            const activeTabLocator = this.activeTab;
            const activeTabTextAfterClick = await activeTabLocator.textContent();
            expect(activeTabText).toBe(activeTabTextAfterClick);
        }
    }

    async verifyManualToggleButton(): Promise<void> {
        const toggleInput = this.manualToggleButton;
        await expect(toggleInput).toBeVisible();
        await toggleInput.click();
        await toggleInput.evaluate((el: HTMLInputElement) => el.checked);

        await expect(this.toasterHeading).toBeVisible();
        const toasterMessage = await this.toasterHeading.textContent();
        expect(toasterMessage).toBe('Manual override updated for selected flights');
    }

    async verifySendButton(): Promise<void> {
        const sendButton = this.sendButton;
        await expect(sendButton).toBeVisible();
        await sendButton.click();

        await expect(this.toasterHeading).toBeVisible();
        const toasterMessage = await this.toasterHeading.textContent();
        expect(toasterMessage).toBe('Selected flight(s) were scheduled for optimization');
    }

    async verifyRefreshButton(): Promise<void> {
        const requestPromise = this.page.waitForResponse("/api/cro/flights/search");
        await this.refreshButton.click();
        const response = await requestPromise;
        expect(response).not.toBeNull();
    }

}
