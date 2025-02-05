import OverlayPo from "../../overlay.po";
import {Locator, Page, expect} from "@playwright/test";

export default class ServicesPo extends OverlayPo {
    readonly servicesTab: Locator;
    readonly chartContainer: Locator;
    readonly axisLabels: Locator;
    readonly dataPoints: Locator;
    readonly tableRows: Locator;
    readonly expandCollapseIcons: Locator;
    readonly expandedRow: Locator;

    constructor(page: Page) {
        super(page);

        this.servicesTab = page.locator('#services');
        this.chartContainer = page.locator('div[aria-label*="Chart"]');
        this.axisLabels = page.locator('g.highcharts-axis text');
        this.dataPoints = page.locator('.highcharts-point');
        this.tableRows = page.locator('.cro-overlay');
        this.expandCollapseIcons = page.locator('.ag-icon-tree-closed, .ag-icon-tree-open');
        this.expandedRow = page.locator('div[role="row"][aria-expanded="true"]');
    }

    async goToServiceTab(): Promise<void> {
        await this.servicesTab.click();
    }

    async selectMetricToggle(option: string): Promise<void> {
        const toggleSpan = this.page.locator(
            `.row.spark-toggle-group span:has-text("${option}")`
        );
        await toggleSpan.click();
    }

    async selectCabinToggle(option: string): Promise<void> {
        const cabinSpan = this.page.locator(
            `.row.spark-toggle-group.spark-flex span:has-text("${option}")`
        );
        await cabinSpan.click();
    }

    async getChartAxisLabels(): Promise<string> {
        return await this.axisLabels.textContent();
    }

    async getDataPointsCount(): Promise<number> {
        return await this.dataPoints.count();
    }

    async expandRow(rowIndex: number): Promise<void> {
        const row = this.page.locator(`div[role="row"][row-index="${rowIndex}"]`);
        const expandIcon = row.locator('.css-zydfs6 .ag-group-contracted > .ag-icon-tree-closed');
        await expect(expandIcon).toBeVisible();
        await expandIcon.click();
    }

    async collapseRow(rowIndex: number): Promise<void> {
        const row = this.page.locator(`div[role="row"][row-index="${rowIndex}"]`);
        const collapseIcon = row.locator('.css-zydfs6 .ag-group-expanded > .ag-icon-tree-open');
        await expect(collapseIcon).toBeVisible();
        await collapseIcon.click();
    }

    async getRowCount(): Promise<number> {
        return await this.tableRows.count();
    }
}
