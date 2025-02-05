import { Locator, Page, expect } from "@playwright/test";

import Overview from "../base";

export class PermissionsOverviewPage extends Overview {
    page: Page;
    overviewTab: Locator;
    manualToggleCheckBox: Locator;
    sendToOptimization: Locator;
    overBookingCell: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.overviewTab = page.getByRole("tab", {name: "Overview"});
        this.manualToggleCheckBox = page.getByLabel("Manual").first();
        this.sendToOptimization = page.locator("#send-to-optimization");
        this.overBookingCell = page.locator("div[col-id='overbookingUser']").nth(1);
    }

    async verifyIfOverviewVisible(): Promise<void> {
        await this.overviewTab.waitFor({state: "visible"});
        expect(await this.overviewTab.isVisible()).toBe(true);
    }

    async verifyIf401tVisible(): Promise<void> {
        const invalidAuthText = this.page.getByText("401 - Unauthorized");
        await invalidAuthText.waitFor({state: "visible"});
        expect(await invalidAuthText.isVisible()).toBe(true);
    }

    async isManualToggleCheckBoxVisible(isHidden = false): Promise<void> {
        if (isHidden) {
            expect(await this.manualToggleCheckBox.isVisible()).toBe(false);
            return;
        }
        await this.manualToggleCheckBox.waitFor({
            state: "visible",
            timeout: 5000,
        });
        expect(await this.manualToggleCheckBox.isVisible()).toBe(true);
    }

    async isSendToOptimizationVisible(isHidden = false): Promise<void> {
        if (isHidden) {
            expect(await this.sendToOptimization.isHidden()).toBe(true);
            return;
        }
        await this.sendToOptimization.waitFor({state: "visible"});
        expect(await this.sendToOptimization.isVisible()).toBe(true);
        expect(await this.sendToOptimization.isEnabled()).toBe(false);
    }

    async isOverBookingCellEditable(isEditable = false): Promise<void> {
        if (isEditable) {
            await this.overBookingCell.waitFor({state: "visible"});
            expect(await this.overBookingCell.isVisible()).toBe(true);
            expect(await this.overBookingCell.isEnabled()).toBe(true);
            await expect(this.overBookingCell).not.toHaveClass(
                /ag-grid-editable-cell-bg/
            );

            return;
        }
        await this.overBookingCell.waitFor({state: "visible"});
        expect(await this.overBookingCell.isVisible()).toBe(true);
        expect(await this.overBookingCell.isEnabled()).toBe(true);
        await expect(this.overBookingCell).toHaveClass(/ag-grid-editable-cell-bg/);
    }
}
