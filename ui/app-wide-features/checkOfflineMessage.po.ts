import {Locator, Page, expect} from "@playwright/test";

class CheckOfflineMessagePo {
    private offlineMessage: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.offlineMessage = page.getByRole("heading", {
            name: "You're currently offline",
        });
    }

    async setOffline(): Promise<void> {
        await this.page.context().setOffline(true);
    }

    async setOnline(): Promise<void> {
        await this.page.context().setOffline(false);
    }

    async verifyIfOfflineTextVisible(): Promise<void> {
        await expect(this.offlineMessage).toBeVisible();
    }

    async verifyIfOfflineTextHidden(): Promise<void> {
        await expect(this.offlineMessage).toBeHidden();
    }
}

export default CheckOfflineMessagePo;
