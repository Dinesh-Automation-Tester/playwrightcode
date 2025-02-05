import {Page, Locator} from "@playwright/test";

export default class AnalysisPo {
    readonly analysisPage: Locator;

    constructor(page: Page) {
        this.analysisPage = page.locator('#flight-analysis');
    }

    async gotoAnalysisPage(): Promise<void> {
        await this.analysisPage.click();
    }
}
