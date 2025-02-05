import {Locator, Page, expect} from "@playwright/test";
import OverlayPo from "../../overlay.po";

export default class OverBookingPo extends OverlayPo {
    readonly tableLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.tableLocator = page.locator('table.cro-kpi-table');
    }

    async verifySummaryValue(heading: string, current: string, expected: string): Promise<void> {
        const specificTable = this.page.locator(`table.cro-kpi-table:has(thead h4:has-text("${heading}"))`);

        await specificTable.waitFor({state: 'visible'});

        await expect(specificTable).toBeVisible();

        const currentValueLocator = specificTable.locator('tbody tr:has(th:has-text("Current")) td');
        const expectedValueLocator = specificTable.locator('tbody tr:has(th:has-text("Expected")) td');

        await expect(currentValueLocator).toHaveText(current.trim(), {timeout: 10000});
        await expect(expectedValueLocator).toHaveText(expected.trim(), {timeout: 10000});
    }
}
