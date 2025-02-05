import {Page} from "@playwright/test";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../src/utils/Constants";

export default class Overview {
    private pageBase: Page;

    constructor(page: Page) {
        this.pageBase = page;
    }

    async gotoOverview(): Promise<void> {
        await this.pageBase.goto(ROUTES_FLIGHT_OVERVIEW);
        await this.pageBase.waitForLoadState("networkidle");
    }
}
