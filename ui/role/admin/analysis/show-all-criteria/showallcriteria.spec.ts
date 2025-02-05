import dayjs from "dayjs";
import { expect, test } from "@playwright/test";
import AnalysisCriteria from "./showallcriteria.po";
import { ROUTES_FLIGHT_ANALYSIS } from "../../../../../../src/utils/Constants";

test.describe("Administration Admin Module", () => {

  const currentDate = dayjs().startOf("day").format("YYYY-MM-DD");
  const next7Days = dayjs().add(6, "day").format("YYYY-MM-DD");
  const next30Days = dayjs().add(29, "day").format("YYYY-MM-DD");
  const next90Days = dayjs().add(89, "day").format("YYYY-MM-DD");
  const customDateRange = dayjs().add(7, "day").format("YYYY-MM-DD");

  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES_FLIGHT_ANALYSIS, { waitUntil: "networkidle" });
  });

  test.describe("Show All Criteria", () => {

    test("search by departure date - Next 7 days", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.departureDateSelection();
      await analysisPo.next7Days.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(currentDate);
      expect(await analysisPo.readEndDate()).toBe(next7Days);
    });

    test("search by departure date - Next 30 days ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.departureDateSelection();
      await analysisPo.next30Days.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(currentDate);
      expect(await analysisPo.readEndDate()).toBe(next30Days);
    });

    test("search by departure date - Next 90 days ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.departureDateSelection();
      await analysisPo.next90Days.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(currentDate);
      expect(await analysisPo.readEndDate()).toBe(next90Days);
    });

    test("search by departure date - Custom days ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.departureDateSelection();
      await analysisPo.customDays.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(currentDate);
      expect(await analysisPo.readEndDate()).toBe(customDateRange);
    });

    test("search by DTD - Next 7 days", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.dtdSelection();
      await analysisPo.seven7DaysDTD.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(next7Days);
      expect(await analysisPo.readEndDate()).toBe(next7Days);
    });

    test("search by DTD - Next 30 days ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.dtdSelection();
      await analysisPo.thirty30DaysDTD.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(next30Days);
      expect(await analysisPo.readEndDate()).toBe(next30Days);
    });

    test("search by DTD - Next 90 days ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.dtdSelection();
      await analysisPo.ninety90DaysDTD.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(next90Days);
      expect(await analysisPo.readEndDate()).toBe(next90Days);
    });

    test("search by DTD - Custom days ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.dtdSelection();
      await analysisPo.customDaysDTD.click();
      await analysisPo.applyButton.click();
      expect(await analysisPo.readStartDate()).toBe(next7Days);
      expect(await analysisPo.readEndDate()).toBe(next7Days);
    });

    test("search by flight number", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.flightNumberToggle.click();
      await analysisPo.selectFlightDropdown.click();
      const flightNumberDropdown = await analysisPo.ValueInDropdown.textContent();
      await analysisPo.flightNumberOptionSelection.click();
      await analysisPo.selectFlightDropdown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const firstPart = overlayValue.split(" · ")[0];
          expect(firstPart == flightNumberDropdown);
        }
      }
    });

    test("search by leg", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.legToggle.click();
      await analysisPo.selectLegDropdown.click();
      const LegValueInDropdown = await analysisPo.ValueInDropdown.textContent();
      await analysisPo.dropDownOptionSelection.click();
      await analysisPo.selectLegDropdown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const firstPart = overlayValue.split(" · ")[1];
          expect(firstPart == LegValueInDropdown);
        }
      }
    });

    test("search by leg origin", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.legOriginToggle.click();
      await analysisPo.selectLegOriginDropdown.click();
      const LegValueInDropdown = await analysisPo.ValueInDropdown.textContent();
      await analysisPo.dropDownOptionSelection.click();
      await analysisPo.selectLegOriginDropdown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const firstPart = overlayValue.split(" · ")[2];
          const OriginLeg = firstPart.split("-")[0];
          expect(OriginLeg == LegValueInDropdown);
        }
      }
    });

    test("search by leg destination", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.legDestinationToggle.click();
      await analysisPo.selectLegDestinationDropdown.click();
      const LegValueInDropdown = await analysisPo.ValueInDropdown.textContent();
      await analysisPo.dropDownOptionSelection.click();
      await analysisPo.selectLegDestinationDropdown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const firstPart = overlayValue.split(" · ")[2];
          const destinationLeg = firstPart.split("-")[1];
          expect(destinationLeg == LegValueInDropdown);
        }
      }
    });

    test("search by time of day - morning", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.midDayTimeOfDay.click();
      await analysisPo.eveningTimeOfDay.click();
      await analysisPo.nightTimeOfDay.click();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const departureTime = overlayValue.split(" · ")[3];
          const startTime = "06:30";
          const endTime = "11:30";
          const departureTimeArr = departureTime.split(":").map(Number);
          const startTimeArr = startTime.split(":").map(Number);
          const endTimeArr = endTime.split(":").map(Number);
          expect(departureTimeArr >= startTimeArr && departureTimeArr <= endTimeArr);
        }
      }
    });

    test("search by time of day - midday", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.morningTimeOfDay.click();
      await analysisPo.eveningTimeOfDay.click();
      await analysisPo.nightTimeOfDay.click();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const departureTime = overlayValue.split(" · ")[3];
          const startTime = "11:30";
          const endTime = "18:30";
          const departureTimeArr = departureTime.split(":").map(Number);
          const startTimeArr = startTime.split(":").map(Number);
          const endTimeArr = endTime.split(":").map(Number);
          expect(departureTimeArr >= startTimeArr && departureTimeArr <= endTimeArr);
        }
      }
    });

    test("search by time of day - evening", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.morningTimeOfDay.click();
      await analysisPo.midDayTimeOfDay.click();
      await analysisPo.nightTimeOfDay.click();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const departureTime = overlayValue.split(" · ")[3];
          const startTime = "18:30";
          const endTime = "23:00";
          const departureTimeArr = departureTime.split(":").map(Number);
          const startTimeArr = startTime.split(":").map(Number);
          const endTimeArr = endTime.split(":").map(Number);
          expect(departureTimeArr >= startTimeArr && departureTimeArr <= endTimeArr);
        }
      }
    });

    test("search by time of day - night", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.goToShowAllCriteriaPage();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.morningTimeOfDay.click();
      await analysisPo.midDayTimeOfDay.click();
      await analysisPo.eveningTimeOfDay.click();
      await analysisPo.timeOfDayDropDown.click();
      await analysisPo.applyButton.click();
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      const links = await analysisPo.overlayLink.all();
      for (let i = 0; i < links.length; i++) {
        const overlayValue = await links[i].textContent();
        if (overlayValue.length > 0) {
          const departureTime = overlayValue.split(" · ")[3];
          const startTime = "23:00";
          const endTime = "06:30";
          const departureTimeArr = departureTime.split(":").map(Number);
          const startTimeArr = startTime.split(":").map(Number);
          const endTimeArr = endTime.split(":").map(Number);
          expect(departureTimeArr >= startTimeArr && departureTimeArr <= endTimeArr);
        }
      }
    });

    test.skip("search by cabin- 'C' ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const cabinCellBefore = await analysisPo.cabinGridcellValue.allInnerTexts();
      if (cabinCellBefore.includes("C")) {
        await analysisPo.cabinSelection();
        await analysisPo.cabinW.click();
        await analysisPo.cabinY.click();
        await analysisPo.cabinDropDown.click();
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", {state: "visible"});
        const cabinCellValues = analysisPo.cabinGridcellValue;
        const visibleRowsCount = await cabinCellValues.count();
        if (visibleRowsCount > 1) {
          for (let i = 0; i < visibleRowsCount - 1; i++) {
            const cabinCellValue = (await cabinCellValues.nth(i).innerText()).trim();
            expect(["C", "TL"]).toContain(cabinCellValue);
          }
        }
      }
    });

    test.skip("search by cabin- 'W' ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const cabinCellBefore = await analysisPo.cabinGridcellValue.allInnerTexts();
      if (cabinCellBefore.includes("W")) {
        await analysisPo.cabinSelection();
        await analysisPo.cabinC.click();
        await analysisPo.cabinY.click();
        await analysisPo.cabinDropDown.click();
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        const cabinCellValues = analysisPo.cabinGridcellValue;
        const visibleRowsCount = await cabinCellValues.count();
        if (visibleRowsCount > 1) {
          for (let i = 0; i < visibleRowsCount - 1; i++) {
            const cabinCellValue = (await cabinCellValues.nth(i).innerText()).trim();
            expect(["W", "TL"]).toContain(cabinCellValue);
          }
        }
      }
    });
    test.skip("search by cabin- 'Y' ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const cabinCellBefore = await analysisPo.cabinGridcellValue.allInnerTexts();
      if (cabinCellBefore.includes("Y")) {
        await analysisPo.cabinSelection();
        await analysisPo.cabinC.click();
        await analysisPo.cabinW.click();
        await analysisPo.cabinDropDown.click();
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        const cabinCellValues = analysisPo.cabinGridcellValue;
        const visibleRowsCount = await cabinCellValues.count();
        if (visibleRowsCount > 1) {
          for (let i = 0; i < visibleRowsCount - 1; i++) {
            const cabinCellValue = (await cabinCellValues.nth(i).innerText()).trim();
            expect(["Y", "TL"]).toContain(cabinCellValue);
          }
        }
      }
    });

    test("search by show manual flights ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      await analysisPo.agGridContainer.evaluate((el) => {
        el.scrollTop += 1000;
      });
      const isChecked = await analysisPo.manualToggle.isChecked();
      if (!isChecked) {
        await analysisPo.manualToggle.click();
      }
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.showAllCriteriaLink.click();
      await analysisPo.resetButton.click();
      await analysisPo.showManualFlights.click();
      await analysisPo.applyButton.click();
      await page.waitForTimeout(2000);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.agGridMenu.click();
      await analysisPo.collapseColumn.click();
      expect(await analysisPo.manualToggle.isChecked()).toBe(true);
    });

    // ---------------Defect Id : DE306537----------
    test.skip("search by forecast seat factor% - total level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.fcstTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.fcstValue.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test.skip("search by forecast seat factor% - total level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.fcstTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by forecast seat factor% - total level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by forecast seat factor% - total level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();

        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue >= inputValue);
        }
      }
    });

    test("search by forecast seat factor% - total level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by forecast seat factor% - total level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by forecast seat factor% - total level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by forecast seat factor% - total level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.fcstTotalLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.fcstTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    // --------------Defect Id : DE306537-------------
    test.skip("search by forecast seat factor% - cabin level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.fcstClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.fcstValue.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test.skip("search by forecast seat factor% - cabin level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.fcstClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by forecast seat factor% - cabin level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by forecast seat factor% - cabin level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by forecast seat factor% - cabin level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by forecast seat factor% - cabin level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.fcstValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by forecast seat factor% - cabin level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by forecast seat factor% - cabin level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.fcstClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.fcstCabinLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.fcstClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.fcstClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    // --------------Defect Id : DE306537-------------
    test.skip("search by booked seat factor% - total level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.bsfTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.bsfValue.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });
    test.skip("search by booked seat factor% - total level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.bsfTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });
    test("search by booked seat factor% - total level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });
    test("search by booked seat factor% - total level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue >= inputValue);
        }
      }
    });
    test("search by booked seat factor% - total level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });
    test("search by booked seat factor% - total level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });
    test("search by booked seat factor% - total level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });
    test("search by booked seat factor% - total level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.bsfTotalLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.bsfTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    //--------------Defect Id : DE306537-------------
    test.skip("search by booked seat factor% - cabin level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.bsfClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.bsfValue.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test("search by booked seat factor% - cabin level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.bsfClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by booked seat factor% - cabin level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = arrayCellValue[0];
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by booked seat factor% - cabin level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by booked seat factor% - cabin level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
        if (!isNaN(Number(TLCellValue))) {
          arrayCellValue.push(TLCellValue);
        }
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by booked seat factor% - cabin level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.bsfValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by booked seat factor% - cabin level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();

          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by booked seat factor% - cabin level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.bsfClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.bsfCabinLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.bsfClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.bsfClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    // --------------Defect Id : DE306537-------------
    test.skip("search by overBooking% - total level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.overBookingTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.overBookingValue.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test.skip("search by overBooking% - total level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.overBookingTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by overBooking% - total level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by overBooking% - total level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue >= inputValue);
        }
      }
    });

    test("search by overBooking% - total level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by overBooking% - total level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by overBooking% - total level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by overBooking% - total level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.overBookingTotalLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MaxValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.overBookingTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    // --------------Defect Id : DE306537-------------
    test.skip("search by overBooking% - cabin level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.overBookingClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.overBookingValue.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test("search by overBooking% - cabin level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.overBookingClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by overBooking% - cabin level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by overBooking% - cabin level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await page.waitForTimeout(1000);
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by overBooking% - cabin level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by overBooking% - cabin level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.overBookingValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by overBooking% - cabin level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by overBooking% - cabin level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.overBookingClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.overBookingCabinLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValuePercentage.fill(String(minValue));
        await analysisPo.MinValuePercentage.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await page.waitForTimeout(1000);
        expect(await analysisPo.overBookingClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.overBookingClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    //---------------Defect Id : DE306537----------
    test.skip("search by seats - total level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.seatsTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.seatsValue.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test.skip("search by seats - total level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.seatsTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by seats - total level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by seats - total level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue >= inputValue);
        }
      }
    });

    test("search by seats - total level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by seats - total level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = arrayCellValue[0];
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by seats - total level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by seats - total level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.seatsTotalLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.seatsTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    test("search by seats - cabin level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.seatsClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.seatsValue.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test("search by seats - cabin level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.seatsClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by seats - cabin level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by seats - cabin level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by seats - cabin level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by seats - cabin level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.seatsValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by seats - cabin level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by seats - cabin level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.seatsClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.seatsCabinLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.seatsClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.seatsClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    //---------------Defect Id : DE306537----------
    test.skip("search by capacity - total level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.capacityTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.capacityValue.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }
    });

    test.skip("search by capacity - total level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.capacityTlCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by capacity - total level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by capacity - total level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue >= inputValue);
        }
      }
    });

    test("search by capacity - total level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by capacity - total level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by capacity - total level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by capacity - total level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityTlCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.capacityTotalLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityTlCellValue.nth(0).isVisible()).toBe(true);
        const visibleRowsCount = await analysisPo.capacityTlCellValue.count();
        for (let i = 0; i < (visibleRowsCount - 1); i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    test("search by capacity - cabin level - equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.capacityClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.EqualOperator.click();
        await analysisPo.capacityValue.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
          expect(inputValue == cabinCellValue);
        }
      }

    });

    test("search by capacity - cabin level - not equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const inputValue = await analysisPo.capacityClCellValue.nth(0).innerText();
      if (Number(inputValue) >= 0) {
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.NotEqualOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
          expect(inputValue != cabinCellValue);
        }
      }
    });

    test("search by capacity - cabin level - greater than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.GreaterThanOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by capacity - cabin level - greater than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => a - b);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.GreaterThanOrEqualOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue > inputValue);
        }
      }
    });

    test("search by capacity - cabin level - less than operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.LessThanOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue < inputValue);
        }
      }
    });

    test("search by capacity - cabin level - less than or equal operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const inputValue = (arrayCellValue[0]);
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.LessThanOrEqualOperator.click();
        await analysisPo.capacityValue.fill(String(inputValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityTlCellValue.nth(i).innerText();
          expect(cabinCellValue <= inputValue);
        }
      }
    });

    test("search by capacity - cabin level - between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length - 1)]);
        const maxValue = arrayCellValue[0];
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.BetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(true);
        }
      }
    });

    test("search by capacity - cabin level - not between range operator ", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      const arrayCellValue = [];
      const cellValueCount = await analysisPo.capacityClCellValue.count();
      for (let i = 0; i < cellValueCount; i++) {
        const TLCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
        const cellValue = Number(TLCellValue);
        arrayCellValue.push(cellValue);
      }
      if (Number(arrayCellValue) > 0) {
        arrayCellValue.sort((a, b) => b - a);
        const minValue = (arrayCellValue[(arrayCellValue.length) - 3]);
        const maxValue = (arrayCellValue[0]);
        await analysisPo.capacityCabinLevelSelection();
        await analysisPo.NotBetweenOperator.click();
        await analysisPo.MinValue.fill(String(minValue));
        await analysisPo.MaxValue.fill(String(maxValue));
        await analysisPo.applyButton.click();
        await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
        expect(await analysisPo.capacityClCellValue.nth(0).isVisible()).toBe(true);
        for (let i = 0; i < 1; i++) {
          const cabinCellValue = await analysisPo.capacityClCellValue.nth(i).innerText();
          const cabinCellValueInNumber = Number(cabinCellValue);
          const maximumValue = Number(maxValue);
          expect(cabinCellValueInNumber >= minValue && cabinCellValueInNumber <= maximumValue).toBe(false);
        }
      }
    });

    test("validate cancel button functionality", async ({ page }) => {
      const analysisPo = new AnalysisCriteria(page);
      await analysisPo.page.waitForSelector(".highcharts-measure-background", { state: "visible" });
      await analysisPo.showAllCriteriaLink.click();
      await analysisPo.cancelButton.click();
      await expect(analysisPo.analysisTab).toBeVisible();
    });

  });

});
