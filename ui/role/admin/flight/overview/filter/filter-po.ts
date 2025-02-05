import {type Locator, type Page, expect} from "@playwright/test";
import dayjs from "dayjs";

import Overview from "../base";

export class FilterSection extends Overview {
    readonly page: Page;
    readonly overviewFilterSection: Locator;

    readonly next7Days: Locator;
    readonly next30Days: Locator;
    readonly next90Days: Locator;
    readonly customDays: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;

    readonly flightNumberToggle: Locator;
    readonly legsToggle: Locator;
    readonly originToggle: Locator;
    readonly destinationToggle: Locator;

    readonly next30DaysRadio: Locator;
    readonly customRadio: Locator;

    readonly applyButton: Locator;
    readonly resetButton: Locator;
    readonly sparkIcon: Locator;

    readonly startMonthInput: Locator;
    readonly dateValidationMessage: Locator;
    readonly calendarBtn: Locator;
    readonly flightNumber: Locator;
    readonly selectAll: Locator;
    readonly unSelectAll: Locator;
    readonly checkbox: Locator;
    readonly firstFlightNumber: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.overviewFilterSection = page.locator(".overview-filter");
        this.next7Days = this.overviewFilterSection
            .locator("span")
            .filter({hasText: "Next 7 daysNext 7 days"});
        this.next30Days = this.overviewFilterSection
            .locator("span")
            .filter({hasText: "Next 30 daysNext 30 days"});
        this.next30DaysRadio = this.overviewFilterSection.getByLabel(
            "Next 30 daysNext 30 days"
        );
        this.customRadio = this.overviewFilterSection.getByLabel("CustomCustom");
        this.next90Days = this.overviewFilterSection
            .locator("span")
            .filter({hasText: "Next 90 daysNext 90 days"});
        this.customDays = this.overviewFilterSection
            .locator("span")
            .filter({hasText: "CustomCustom"});
        this.applyButton = this.overviewFilterSection.getByText(/APPLY/i, {
            exact: false,
        });
        this.resetButton = this.overviewFilterSection.getByText("RESET");
        this.startDate = this.overviewFilterSection
            .locator("label")
            .locator('input[type="date"]')
            .nth(0);
        this.endDate = this.overviewFilterSection
            .locator("label")
            .locator('input[type="date"]')
            .nth(1);
        this.startMonthInput = this.overviewFilterSection.getByLabel("Start month");
        this.startMonthInput = this.overviewFilterSection.getByLabel("Start month");
        this.dateValidationMessage =
            this.overviewFilterSection.getByText("Enter valid date");
        this.calendarBtn = this.overviewFilterSection
            .locator("label")
            .getByLabel("Show Calendar. Only available")
            .nth(0);
        this.sparkIcon = this.overviewFilterSection.locator(".spark-icon");
        this.flightNumberToggle = this.overviewFilterSection.getByText(
            "Flight number",
            {exact: true}
        );
        this.legsToggle = this.overviewFilterSection.getByText("Leg", {
            exact: true,
        });
        this.originToggle = this.overviewFilterSection.getByText("Leg origin");
        this.destinationToggle = this.overviewFilterSection.getByText("Leg dest");

        this.flightNumber = this.overviewFilterSection.getByPlaceholder(
            "Enter flight number..."
        );
        this.selectAll = this.overviewFilterSection.getByRole("link", {
            name: "Select all",
        });
        this.unSelectAll = this.overviewFilterSection.getByRole("link", {
            name: "Unselect all",
        });
        this.checkbox = this.page.getByRole("option").nth(0);
        this.firstFlightNumber = this.page.getByText("2", {exact: true}).first();
    }

    async toggleSelectAll(): Promise<void> {
        await this.flightNumberToggle.click();
        await this.flightNumber.click();
        await this.selectAll.click();

        expect(await this.firstFlightNumber.isVisible()).toBe(true);
        await this.unSelectAll.click();
        await this.flightNumber.click();

        await this.flightNumberToggle.click();
        expect(
            await this.overviewFilterSection
                .locator("#flight-number-selector")
                .textContent()
        ).toBe("Select flight number");
    }

    async readStartDate(): Promise<string> {
        return await this.startDate.inputValue();
    }

    async readEndDate(): Promise<string> {
        return await this.endDate.inputValue();
    }

    async clearStartDate(): Promise<void> {
        const startDateValue = await this.startDate.evaluate(
            (e: HTMLInputElement) => {
                e.style.display = "";
                e.value = "";
                return e.value;
            }
        );
        expect(startDateValue).toBe("");
    }

    async clickApplyButton(): Promise<void> {
        await expect(this.applyButton).toBeVisible();
        await this.applyButton.click();
    }

    async isFilterApiCallMade(skipAPICall = false): Promise<void> {
        if (skipAPICall) {
            try {
                await this.page.waitForRequest(() => true, {timeout: 100}); // Adjust timeout as needed
                await this.clickApplyButton();
                console.error("An API call was made when it should not have been.");
            } catch (error) {
                expect(error.message).toContain("Timeout 100ms exceeded");
            }
            return;
        }

        const requestPromise = this.page.waitForRequest(() => true, {
            timeout: 25000,
        });
        await this.clickApplyButton();
        const request = await requestPromise;
        expect(request.method()).toBe("POST");
    }

    async clickResetButton(): Promise<void> {
        await expect(this.resetButton).toBeVisible();
        await this.resetButton.click();
    }

    async selectCalendarDate(): Promise<void> {
        await this.calendarBtn.click();

        const targetDate = dayjs().add(2, "month"); // Or any date object you want to format

        await this.startMonthInput.fill(targetDate.format("MM"));
        await this.page.waitForTimeout(1000);
        await this.startMonthInput.press("Tab");
    }

    async enterFlightNumberAndVerify(): Promise<void> {
        await this.flightNumberToggle.click();
        await this.flightNumber.click();
        await this.flightNumber.fill("2");
        await this.flightNumber.blur();
        expect(await this.firstFlightNumber.isVisible()).toBe(true);
    }

    async enterMultipleFlightNumbersAndVerify(): Promise<void> {
        await this.flightNumberToggle.click();
        await this.flightNumber.click();
        await this.flightNumber.fill("2");
        await this.flightNumber.blur();
        await this.flightNumber.fill("3");
        await this.flightNumber.blur();
        await this.flightNumber.fill("4");
        await this.flightNumber.blur();
        await this.flightNumber.fill("5");
        await this.flightNumber.blur();
        expect(await this.firstFlightNumber.isVisible()).toBe(true);
    }
}
