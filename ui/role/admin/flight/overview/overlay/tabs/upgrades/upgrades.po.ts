import OverlayPo from "../../overlay.po";
import {Locator, Page, expect} from "@playwright/test";

export default class UpgradesPo extends OverlayPo {
    readonly upgradeTab: Locator;
    readonly userPinchField: Locator;
    readonly capacityUpgradeField: Locator;
    readonly upgradeSeatsUserField: Locator;
    readonly updatedValueSaveButton: Locator;

    constructor(page: Page) {
        super(page);

        this.upgradeTab = page.locator('#upgrades');
        this.updatedValueSaveButton = page.locator('button', {hasText: 'Save'});
        this.upgradeSeatsUserField = page.locator('div[role="gridcell"][col-id="upgradeSeatsUser"] span:has-text("9")');
        this.capacityUpgradeField = page.locator('div[role="gridcell"][col-id="userCapacityUpgradeOfSeatsFrom"]').nth(0);
        this.userPinchField = page.locator('div[role="gridcell"][col-id="userPinchPercentReduction"][aria-colindex="9"]').nth(0);
    }

    async verifyCapacityUpgrade(): Promise<void> {
        await this.upgradeTab.click();
        await this.capacityUpgradeField.dblclick();
        await this.capacityUpgradeField.press('0');
        await this.capacityUpgradeField.press('Enter');
        await this.updatedValueSaveButton.click();
        expect(await this.capacityUpgradeField.textContent()).toBe('0');
    }

    async verifyUserPinchValue(): Promise<void> {
        await this.upgradeTab.click();
        await this.userPinchField.dblclick();
        await this.userPinchField.press('1');
        await this.userPinchField.press('Enter');
        await this.updatedValueSaveButton.click();
        expect(await this.userPinchField.textContent()).toBe('1');
    }

    async resetUpgradeToDefault(): Promise<void> {
        await this.upgradeTab.click();
        await this.capacityUpgradeField.dblclick();
        await this.capacityUpgradeField.press('0');
        await this.capacityUpgradeField.press('Backspace');
        await this.userPinchField.dblclick();
        await this.userPinchField.press('0');
        await this.userPinchField.press('Backspace');
        await this.userPinchField.press('Enter');
        await this.updatedValueSaveButton.click();
    }
}
