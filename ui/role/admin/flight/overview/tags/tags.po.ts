import { Locator, Page, expect } from "@playwright/test";

export class TagsSection {
    readonly page: Page;
    readonly tagsContainer: Locator;
    readonly tags = [
        "Oversale flights",
        "Potential full flights",
        "Sold too soon",
        "High overbooking %",
        "Overbook Y Cabin",
        "Premium Cabin Oversold",
        "Potential Spoilage",
        "Low Ovb Level",
    ];

    readonly tagsText = [
        "Flights already overbooked which are close to departure",
        "Flights expected to be full which are filling fast",
        "Flights booked full and closed for sale",
        "System/User overbooking level exceeds threshold set - calculated on cabin level",
        "Potential to overbook Y cabin as Y cabin is full and seats are potentially available on higher cabin",
        "Premium economy, business or first cabin are oversold - calculated on cabin level",
        "Flight not overbooked, but based on show-up rates expected to have empty seats",
        "Capacity changed and current authorization level is less than effective capacity",
    ];

    constructor(page: Page) {
        this.page = page;
        this.tagsContainer = page.locator(".alerts-tab-container");
    }

    async clickApplyButton(): Promise<void> {
        await this.page.getByRole("button", {name: "APPLY"}).click();
    }

    async checkIfTagsVisible(): Promise<void> {
        await expect(this.tagsContainer).toBeVisible();
    }

    async shouldRenderAllTags(): Promise<void> {
        await this.page.waitForSelector(".alerts-tab-container");
        const allTags = await this.tagsContainer.getByRole("link").all();
        expect(allTags.length).toBe(8);

        for (let i = 0; i < this.tags.length; i++) {
            expect(await allTags[i].textContent()).toContain(this.tags[i]);
        }
    }

    async shouldVerifyChangesOnTagClick(): Promise<void> {
        await expect(this.tagsContainer).toBeVisible();
        const allTags = await this.tagsContainer.getByRole("link").all();
        expect(allTags.length).toBe(8);

        for (let i = 0; i < this.tags.length; i++) {
            await allTags[i].click();
            await this.page.waitForTimeout(1500);
            expect(this.page.getByText(this.tagsText[i])).toBeDefined();
        }
    }
}
