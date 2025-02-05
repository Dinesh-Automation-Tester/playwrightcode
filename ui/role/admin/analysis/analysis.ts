import {Page} from "@playwright/test";

import {ROUTES_FLIGHT_ANALYSIS} from "../../../../../src/utils/Constants";

export default class Overview {
  private pageBase: Page;

  constructor(page: Page) {
    this.pageBase = page;
  }

  async gotoOverview(): Promise<void> {
    await this.pageBase.goto(ROUTES_FLIGHT_ANALYSIS);
    await this.pageBase.waitForLoadState("networkidle");
  }
}
