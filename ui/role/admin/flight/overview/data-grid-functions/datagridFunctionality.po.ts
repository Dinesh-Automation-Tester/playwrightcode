import {Locator, Page, expect} from "@playwright/test";
import Overview from "../base";

export default class OverviewGridFunctionality extends Overview {
    readonly page: Page;
    readonly selectAllCheckbox: Locator;
    readonly selectRowCheckbox: Locator;
    readonly menuTrigger: Locator;
    readonly gridCell: Locator;
    readonly revenueCol: Locator;
    readonly avgFare: Locator;
    readonly rowData: Locator;
    readonly column_filter: Locator;
    readonly fill_column_value: Locator;
    readonly column_filter_uncheck: Locator;
    readonly column_filter_checkbox: Locator;
    readonly pinColumnsOption: Locator;
    readonly pinLeftOption: Locator;
    readonly pinRightOption: Locator;
    readonly expandRow: Locator;
    readonly collapseRow: Locator;
    readonly cabinColumnFirstCellData: Locator;
    readonly lastUploadedColumn: Locator;
    readonly chooseColumn: Locator;
    readonly chooseColumn_CheckBox: Locator;
    readonly resetColumn: Locator;
    readonly noPinOption: Locator;
    readonly cabinMenuTrigger: Locator;
    readonly lastUploadedMenuTrigger: Locator;
    readonly filterApplyButton: Locator;
    readonly applyButton: Locator;
    readonly saveButton: Locator;
    readonly changesSaved: Locator;
    readonly userColumnTrigger: Locator;
    readonly closeLeg: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.selectAllCheckbox = page.locator('#ag-6-input');
        this.selectRowCheckbox = page
            .getByLabel("Press Space to toggle row")
            .first();
        this.menuTrigger = page.getByText("Cabin", {exact: true});
        this.cabinMenuTrigger = page.locator("//span[@data-ref=\"eMenu\"]").nth(0);
        this.lastUploadedMenuTrigger = page.locator("//span[@data-ref=\"eMenu\"]").nth(23);
        this.revenueCol = page.getByRole("columnheader", {name: "Revenue"});
        this.avgFare = page.getByRole("columnheader", {name: "Average Fare"});
        this.gridCell = page.locator('.ag-cell[col-id="cabin"]');
        this.rowData = page.locator(".ag-cell.ag-column-first ").nth(0);
        this.column_filter = page.getByText("Column Filter");
        this.column_filter_uncheck = page.getByLabel("(Select All)");
        this.column_filter_checkbox = page
            .locator("//input[@class='ag-input-field-input ag-checkbox-input']")
            .nth(7);
        this.pinColumnsOption = page.getByText("Pin Column");
        this.pinRightOption = page.getByText("Pin Right");
        this.pinLeftOption = page.getByText("Pin Left");
        this.noPinOption = page.getByText("No Pin");
        this.cabinColumnFirstCellData = page.locator(".css-1yltisf").nth(0);
        this.lastUploadedColumn = page.locator(".ag-column-last").nth(2);
        this.chooseColumn = page
            .getByLabel("Column Menu")
            .getByText("Choose Columns");
        this.chooseColumn_CheckBox = page
            .getByLabel("Cabin")
            .getByLabel("Press SPACE to toggle");
        this.resetColumn = page
            .getByLabel("Column Menu")
            .getByText("Reset Columns", {exact: true});
        this.expandRow = page
            .getByLabel("Column Menu")
            .getByText("Expand All Row Groups");
        this.collapseRow = page
            .getByLabel("Column Menu")
            .getByText("Collapse All Row Groups");
        this.filterApplyButton = page.getByRole('button', {name: 'Apply'});
        this.applyButton = page.getByLabel('Column Menu').getByRole('button', {name: 'Apply'});
        this.saveButton = page.locator(".spark-btn.spark-btn--sm.spark-progress.css-1w1w2zp");
        this.changesSaved = page.getByText("Changes saved");
        this.userColumnTrigger = page.locator("//span[@data-ref=\"eMenu\"]").nth(13);
        this.fill_column_value = page.getByText("Fill column with value");
        this.closeLeg = page.locator(".css-10foor3");
    }

    async toggleSelectAll(isHidden = false): Promise<void> {
        if (isHidden) {
            const selectAllVisible = await this.selectAllCheckbox.isVisible();
            const selectRowVisible = await this.selectRowCheckbox.isVisible();
            expect(selectAllVisible).toBe(false);
            expect(selectRowVisible).toBe(false);
            return;
        }

        await this.selectAllCheckbox.waitFor({state: 'visible'});

        if (!(await this.selectAllCheckbox.isChecked())) {
            await this.selectAllCheckbox.check();
            expect(await this.selectAllCheckbox.isChecked()).toBe(true);
            expect(await this.selectRowCheckbox.isChecked()).toBe(true);
        }

        await this.selectAllCheckbox.uncheck();
        expect(await this.selectAllCheckbox.isChecked()).toBe(false);
        expect(await this.selectRowCheckbox.isChecked()).toBe(false);
    }

    async fillColumnWithValue(): Promise<void> {
        const x = Math.random() * 100;
        const y = Math.round(x);

        await this.userColumnTrigger.waitFor({state: 'visible'});
        await this.userColumnTrigger.click();

        await this.fill_column_value.waitFor({state: 'visible'});
        await this.fill_column_value.click();

        await this.page.getByPlaceholder("Enter value...").fill(y.toString());

        await this.applyButton.waitFor({state: 'visible'});
        await this.applyButton.click();

        await this.saveButton.waitFor({state: 'visible'});
        await this.saveButton.click();

        await this.changesSaved.waitFor({state: 'visible'});
        expect(await this.changesSaved.isVisible()).toBe(true);
    }

    async dragDropCheck(): Promise<void> {
        await this.revenueCol.waitFor({state: 'visible'});
        await this.avgFare.waitFor({state: 'visible'});

        expect(await this.revenueCol.isVisible()).toBe(true);
        expect(await this.avgFare.isVisible()).toBe(true);

        await this.revenueCol.dragTo(this.avgFare);
    }

    async pinRightColumn(): Promise<void> {
        await this.cabinMenuTrigger.waitFor({state: 'visible'});
        await this.cabinMenuTrigger.click();

        await this.pinColumnsOption.waitFor({state: 'visible'});
        await this.pinColumnsOption.click();

        await this.pinRightOption.waitFor({state: 'visible'});
        await this.pinRightOption.click();
    }

    async pinLeftColumnAndNoPinColumn(): Promise<void> {
        await this.lastUploadedMenuTrigger.waitFor({state: 'visible'});
        await this.lastUploadedMenuTrigger.click();

        await this.pinColumnsOption.waitFor({state: 'visible'});
        await this.pinColumnsOption.click();
        await this.pinLeftOption.waitFor({state: 'visible'});
        await this.pinLeftOption.click();

        await this.cabinMenuTrigger.waitFor({state: 'visible'});
        await this.cabinMenuTrigger.click();

        await this.pinColumnsOption.waitFor({state: 'visible'});
        await this.pinColumnsOption.click();
        await this.noPinOption.waitFor({state: 'visible'});
        await this.noPinOption.click();

    }

    async chooseColumnInFilter(): Promise<void> {
        await this.cabinMenuTrigger.click();
        await this.chooseColumn.click();
        await this.chooseColumn_CheckBox.uncheck();
        expect(await this.cabinColumnFirstCellData.isHidden()).toBeTruthy();
    }

    async resetColumnOptions(): Promise<void> {
        const beforeReset = await this.cabinColumnFirstCellData.textContent();
        await this.cabinMenuTrigger.click();
        await this.pinColumnsOption.click();
        await this.pinRightOption.click();
        const afterRest = await this.lastUploadedColumn.textContent();
        await this.cabinMenuTrigger.click();
        await this.resetColumn.click();
        expect(afterRest == beforeReset).toBeTruthy();
    }

}
