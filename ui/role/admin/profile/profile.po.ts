import {type Locator, type Page, expect} from "@playwright/test";

export class ProfileSection {
    readonly page: Page;
    readonly cancelButton: Locator;
    readonly saveButton: Locator;
    readonly legSelector: Locator;
    readonly marketSelector: Locator;
    readonly marketDropdownOptions: Locator;
    readonly legDropdownOptions: Locator;
    readonly dropdownSelect: Locator;
    readonly saveVerification: Locator;
    readonly dropdownHold: Locator;
    readonly profileHeader: Locator;
    readonly overViewTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cancelButton = page.getByRole("button", {name: "Cancel"});
        this.saveButton = page.getByRole("button", {name: "Save"});
        this.legSelector = page.getByPlaceholder("Enter leg");
        this.marketSelector = page.getByPlaceholder("Enter markets");
        this.marketDropdownOptions = page.locator("//*[@id='downshift-:r5:-menu']");
        this.legDropdownOptions = page.locator("//ul[@id='downshift-:r7:-menu']");
        this.dropdownSelect = page.locator("//li[@role='option']");
        this.saveVerification = page.getByText(
            "User preferences updated successfully\n"
        );
        this.dropdownHold = page.getByRole("listbox").getByRole("listitem");
        this.profileHeader = page.getByText("My profile");
        this.overViewTab = page.getByRole("tab", {name: "Overview"});
    }

    async selectMarketDropdownOptions(): Promise<void> {
        await this.marketSelector.click();
        await this.dropdownHold.click();
        await this.marketDropdownOptions.waitFor({state: "visible"});
        await this.dropdownSelect.nth(0).click();
        await this.marketSelector.click();
    }

    async selectLegsDropdownOptions(): Promise<void> {
        await this.legSelector.click();
        await this.dropdownHold.click();
        await this.legDropdownOptions.waitFor({state: "visible"});
        await this.dropdownSelect.nth(0).click();
        await this.legSelector.click();
    }

    async saveProfile(): Promise<void> {
        expect(await this.saveButton.isVisible()).toBe(true);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        expect(await this.saveVerification.isVisible()).toBe(true);
    }
}
