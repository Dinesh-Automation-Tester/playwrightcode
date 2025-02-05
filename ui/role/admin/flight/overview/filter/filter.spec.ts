import dayjs from "dayjs";
import {FilterSection} from "./filter-po";
import {expect, test} from "@playwright/test";
import legsJSON from "../../../../../fixtures/admin/legs";
import preferenceJSON from "../../../../../fixtures/admin/user-preferences";
import flightNumbersJSON from "../../../../../fixtures/admin/flight-numbers";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../src/utils/Constants";

test.describe("Overview filter section, ", () => {
    const currentDate = dayjs().startOf("day").format("YYYY-MM-DD");
    const next7Days = dayjs().add(6, "day").format("YYYY-MM-DD");
    const next30Days = dayjs().add(29, "day").format("YYYY-MM-DD");
    const next90Days = dayjs().add(89, "day").format("YYYY-MM-DD");

    test.beforeEach(async ({page}) => {
        await page.goto(ROUTES_FLIGHT_OVERVIEW);

        await page.route("*/**/api/cro/user/preferences", async (route) => {
            await route.fulfill({json: preferenceJSON});
        });

        await page.route("*/**/api/cro/config/flights", async (route) => {
            await route.fulfill({json: flightNumbersJSON});
        });

        await page.route("*/**/api/cro/config/legs", async (route) => {
            await route.fulfill({json: legsJSON});
        });
    });

    test.describe("Date Range Selector & Buttons", () => {
        test("validates 'Next 7 Days' button functionality and date range adjustment", async ({
                                                                                                  page,
                                                                                              }) => {
            const filterSection = new FilterSection(page);
            await filterSection.next7Days.click();

            expect(await filterSection.readStartDate()).toBe(currentDate);
            expect(await filterSection.readEndDate()).toBe(next7Days);
        });

        test("confirms 'Next 30 Days' button adjusts the date range as expected", async ({
                                                                                             page,
                                                                                         }) => {
            const filterSection = new FilterSection(page);
            await filterSection.next30Days.click();

            expect(await filterSection.readStartDate()).toBe(currentDate);
            expect(await filterSection.readEndDate()).toBe(next30Days);
        });

        test("ensures 'Next 90 Days' button modifies the date range correctly", async ({
                                                                                           page,
                                                                                       }) => {
            const filterSection = new FilterSection(page);
            await filterSection.next90Days.click();

            expect(await filterSection.readStartDate()).toBe(currentDate);
            expect(await filterSection.readEndDate()).toBe(next90Days);
        });

        test("verifies default duration is correctly set from API response", async ({
                                                                                        page,
                                                                                    }) => {
            await page.reload();
            await page.waitForLoadState("networkidle", {timeout: 60000});

            const filterSection = new FilterSection(page);
            expect(await filterSection.next30DaysRadio.isChecked()).toBe(true);
        });

        test.describe("Date Picker", async () => {
            test.beforeEach(async ({page}) => {
                await page.reload();
            });
            test("allows selection of start date directly from the date picker", async ({
                                                                                            page,
                                                                                        }) => {
                const filterSection = new FilterSection(page);
                await filterSection.next7Days.click();
                const startDate = await filterSection.readStartDate();
                expect(startDate).toBe(currentDate); // Mocked date

                const endDate = await filterSection.readEndDate();
                expect(endDate).toBe(next7Days); // Mocked date
            });

            test("ensures the date range is set to 7 days when 'Next 7 Days' is selected", async ({
                                                                                                      page,
                                                                                                  }) => {
                const filterSection = new FilterSection(page);
                await filterSection.next7Days.click();
                const endDate = await filterSection.readEndDate();
                expect(endDate).toBe(next7Days);

                await filterSection.next90Days.click();
                const endDate1 = await filterSection.readEndDate();
                expect(endDate1).toBe(next90Days);
            });

            test.skip("prevents selection of dates before the minimum allowed date", async ({
                                                                                           page,
                                                                                       }) => {
                const filterSection = new FilterSection(page);
                await filterSection.next7Days.click();

                const prevDay = dayjs().subtract(1, "month").format("MM");
                await filterSection.startMonthInput.fill(prevDay);

                expect(await filterSection.readStartDate()).toBe("");
                await filterSection.startMonthInput.press("Tab");
                await page.waitForSelector(".spark-input__message").then(async () => {
                    await expect(filterSection.dateValidationMessage).toBeVisible();
                });
            });

            test("selects the 'Custom' option when dates are chosen directly from the calendar", async ({
                                                                                                            page,
                                                                                                        }) => {
                const filterSection = new FilterSection(page);
                await filterSection.selectCalendarDate();
                await page.waitForTimeout(1000);
                expect(await filterSection.customRadio.isChecked()).toBe(true);
            });

            test.skip("permits manual date entry and validates the entered date", async ({
                                                                                        page,
                                                                                    }) => {
                const filterSection = new FilterSection(page);
                await filterSection.next7Days.click();

                const otherDay = dayjs().add(1, "month").format("MM");
                await filterSection.startMonthInput.fill(otherDay);

                expect(await filterSection.readStartDate()).toBe(
                    dayjs().add(1, "month").format("YYYY-MM-DD")
                );
            });

            test("resets both start and end dates to default values upon reset button click", async ({
                                                                                                         page,
                                                                                                     }) => {
                const filterSection = new FilterSection(page);
                await filterSection.customDays.click();
                await filterSection.clickResetButton();

                expect(await filterSection.readStartDate()).toBe(currentDate);
                expect(await filterSection.readEndDate()).toBe(next30Days);
            });
        });
    });
});
