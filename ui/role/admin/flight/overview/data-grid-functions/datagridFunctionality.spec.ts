import {expect, test} from "@playwright/test";
import OverviewGridFunctionality from "./datagridFunctionality.po";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../src/utils/Constants";

test.describe("Administration Admin Module", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(ROUTES_FLIGHT_OVERVIEW);
    });

    test.describe("Flight Overview Data Grid", () => {

        test.describe("Column Functionality", () => {

            test.skip("ensures visibility and usability of checkbox for users with WRITE permission", async ({
                                                                                                            page,
                                                                                                        }) => {
                const gridPO = new OverviewGridFunctionality(page);
                await gridPO.toggleSelectAll();
            });

            test("verifies drag and drop functionality", async ({page,}) => {
                const gridPO = new OverviewGridFunctionality(page);
                await gridPO.dragDropCheck();
            });

        });

        test.describe("Cabin Column Menu", async () => {

            test.skip("validate operation of the fill column with value feature", async ({page,}) => {
                const gridPo = new OverviewGridFunctionality(page);
                await gridPo.fillColumnWithValue();
            });

            test.skip("Pin Column functionality for both left and right pinning", async ({page}) => {
                const gridPo = new OverviewGridFunctionality(page);

                await gridPo.cabinColumnFirstCellData.waitFor({state: 'visible'});
                const beforePinRight = await gridPo.cabinColumnFirstCellData.textContent();

                await gridPo.pinRightColumn();

                await gridPo.lastUploadedColumn.waitFor({state: 'visible'});
                const afterPinRight = await gridPo.lastUploadedColumn.textContent();
                expect(afterPinRight).toBe(beforePinRight);

                await gridPo.pinLeftColumnAndNoPinColumn();

                const afterUnpin = await gridPo.cabinColumnFirstCellData.textContent();
                expect(afterUnpin).toBe(beforePinRight);
            });

            test("examines the Choose Columns feature for custom column selection", async ({page,}) => {
                const gridPo = new OverviewGridFunctionality(page);
                await gridPo.chooseColumnInFilter();
            });

            test("confirms Reset Columns feature restores default column settings", async ({page,}) => {
                const gridPo = new OverviewGridFunctionality(page);
                await gridPo.resetColumnOptions();
            });

            test("Expand and Collapse group functionality", async ({page}) => {
                const gridPo = new OverviewGridFunctionality(page);

                await gridPo.cabinMenuTrigger.waitFor({state: 'visible'});
                await gridPo.cabinMenuTrigger.click();
                await gridPo.expandRow.waitFor({state: 'visible'});
                await gridPo.expandRow.click();

                await gridPo.cabinColumnFirstCellData.waitFor({state: 'visible'});
                expect(await gridPo.cabinColumnFirstCellData.isVisible()).toBe(true);

                await gridPo.cabinMenuTrigger.click();
                await gridPo.collapseRow.waitFor({state: 'visible'});
                await gridPo.collapseRow.click();

                await gridPo.cabinColumnFirstCellData.waitFor({state: 'hidden'});
                expect(await gridPo.cabinColumnFirstCellData.isHidden()).toBe(true);
            });

        });
    });
});
