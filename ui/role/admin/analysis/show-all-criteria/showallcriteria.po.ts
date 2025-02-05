import Analysis from "../analysis";
import {Locator, Page} from "@playwright/test";

export default class AnalysisCriteria extends Analysis {
    readonly page: Page;
    readonly showAllCriteriaLink: Locator;
    readonly searchByDropdown: Locator;
    readonly departureDateDropdown: Locator;
    readonly departureDateOption: Locator;
    readonly dtdOption: Locator;
    readonly next7Days: Locator;
    readonly next30Days: Locator;
    readonly next90Days: Locator;
    readonly customDays: Locator;
    readonly seven7DaysDTD: Locator;
    readonly thirty30DaysDTD: Locator;
    readonly ninety90DaysDTD: Locator;
    readonly customDaysDTD: Locator;
    readonly flightNumberToggle: Locator;
    readonly selectFlightDropdown: Locator;
    readonly selectLegDropdown: Locator;
    readonly selectLegOriginDropdown: Locator;
    readonly selectLegDestinationDropdown: Locator;
    readonly flightNumberOptionSelection: Locator;
    readonly ValueInDropdown: Locator;
    readonly legToggle: Locator;
    readonly dropDownOptionSelection: Locator;
    readonly legOriginToggle: Locator;
    readonly legDestinationToggle: Locator;
    readonly timeOfDayDropDown: Locator;
    readonly morningTimeOfDay: Locator;
    readonly midDayTimeOfDay: Locator;
    readonly eveningTimeOfDay: Locator;
    readonly nightTimeOfDay: Locator;
    readonly cabinDropDown: Locator;
    readonly cabinC: Locator;
    readonly cabinW: Locator;
    readonly cabinY: Locator;
    readonly showManualFlights: Locator;
    readonly applyButton: Locator;
    readonly daysToDepartureDropdown: Locator;
    readonly fcstTotalLevel: Locator;
    readonly fcstCabinLevel: Locator;
    readonly fcstDropdown: Locator;
    readonly fcstValue: Locator;
    readonly EqualOperator: Locator;
    readonly NotEqualOperator: Locator;
    readonly GreaterThanOperator: Locator;
    readonly GreaterThanOrEqualOperator: Locator;
    readonly LessThanOperator: Locator;
    readonly LessThanOrEqualOperator: Locator;
    readonly BetweenOperator: Locator;
    readonly NotBetweenOperator: Locator;
    readonly MinValuePercentage: Locator;
    readonly MaxValuePercentage: Locator;
    readonly MinValue: Locator;
    readonly MaxValue: Locator;
    readonly bsfTotalLevel: Locator;
    readonly bsfCabinLevel: Locator;
    readonly bsfDropdown: Locator;
    readonly bsfValue: Locator;
    readonly overBookingTotalLevel: Locator;
    readonly overBookingCabinLevel: Locator;
    readonly overBookingDropdown: Locator;
    readonly overBookingValue: Locator;
    readonly seatsTotalLevel: Locator;
    readonly seatsCabinLevel: Locator;
    readonly seatsDropdown: Locator;
    readonly seatsValue: Locator;
    readonly capacityTotalLevel: Locator;
    readonly capacityCabinLevel: Locator;
    readonly capacityDropdown: Locator;
    readonly capacityValue: Locator;
    readonly resetButton: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly overlayLink: Locator;
    readonly agGridMenu: Locator;
    readonly collapseColumn: Locator;
    readonly cabinGridcellValue: Locator;
    readonly fcstTlCellValue: Locator;
    readonly manualToggle: Locator;
    readonly agGridContainer: Locator;
    readonly fcstClCellValue: Locator;
    readonly bsfTlCellValue: Locator;
    readonly bsfClCellValue: Locator;
    readonly overBookingTlCellValue: Locator;
    readonly overBookingClCellValue: Locator;
    readonly seatsTlCellValue: Locator;
    readonly seatsClCellValue: Locator;
    readonly capacityTlCellValue: Locator;
    readonly capacityClCellValue: Locator;
    readonly cancelButton: Locator;
    readonly analysisTab: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.showAllCriteriaLink = page.getByRole("button", {name: "Show All Criteria"});
        this.searchByDropdown = page.getByRole("combobox", {name: "Search by"}).getByLabel("toggle menu");
        this.departureDateOption = page.getByRole("option", {name: "Departure Date"}).locator("span");
        this.dtdOption = page.getByRole("option", {name: "DTD"}).locator("span");
        this.departureDateDropdown = page.getByRole("combobox", {name: "Departure date"}).getByLabel("toggle menu");
        this.daysToDepartureDropdown = page.getByRole("combobox", {name: "Days to departure"}).locator("div").nth(2);
        this.next7Days = page.getByRole("option", {name: "Next 7 days"});
        this.next30Days = page.getByRole("option", {name: "Next 30 days"});
        this.next90Days = page.getByRole("option", {name: "Next 90 days"});
        this.customDays = page.getByRole("option", {name: "Custom"});
        this.applyButton = page.getByLabel("Search Criteria").getByRole("button", {name: "Apply"});
        this.seven7DaysDTD = page.getByRole("option", {name: "7 days"});
        this.thirty30DaysDTD = page.getByRole("option", {name: "30 days"});
        this.ninety90DaysDTD = page.getByRole("option", {name: "90 days"});
        this.customDaysDTD = page.getByRole("option", {name: "Custom"});
        this.flightNumberToggle = page.getByLabel("Search Criteria").getByText("Flight number");
        this.selectFlightDropdown = page.getByPlaceholder("Enter flight number...");
        this.selectLegDropdown = page.getByLabel("Search Criteria").getByPlaceholder("Enter leg...");
        this.selectLegOriginDropdown = page.getByPlaceholder("Enter leg origin...");
        this.selectLegDestinationDropdown = page.getByPlaceholder("Enter leg destination...");
        this.flightNumberOptionSelection = page.getByRole("option", {name: "56"}).locator("span").first();
        this.legToggle = page.getByLabel("Search Criteria").getByText("Leg", {exact: true});
        this.dropDownOptionSelection = page.locator(".spark-checkbox__box.css-yfi8uo").nth(1);
        this.legOriginToggle = page.getByLabel("Search Criteria").getByText("Leg origin");
        this.legDestinationToggle = page.getByLabel("Search Criteria").getByText("Leg dest");
        this.morningTimeOfDay = page.getByRole("option", {name: "Midday (11:30-18:30)"}).locator("span").first();
        this.midDayTimeOfDay = page.getByRole("option", {name: "Midday (11:30-18:30)"}).locator("span").first();
        this.eveningTimeOfDay = page.getByRole("option", {name: "Evening (18:30-23:00)"}).locator("span").first();
        this.nightTimeOfDay = page.getByRole("option", {name: "Night (23:00-6:30)"}).locator("span").first();
        this.timeOfDayDropDown = page.getByRole("combobox", {name: "Time of day"}).getByLabel("toggle menu");
        this.cabinDropDown = page.getByRole("combobox", {name: "Cabin"}).getByLabel("toggle menu");
        this.cabinC = page.getByRole("option", {name: "C"}).locator("span").first();
        this.cabinY = page.getByRole("option", {name: "Y"}).locator("span").first();
        this.cabinW = page.getByRole("option", {name: "W"}).locator("span").first();
        this.showManualFlights = page.locator("div[class='spark-flex spark-mar-t-1 spark-pad-t-.5'] span[class='spark-toggle-switch__handle']");
        this.fcstTotalLevel = page.getByText("TOTAL LEVEL").first();
        this.fcstDropdown = page.locator(".css-fbi3hj").nth(6);
        this.EqualOperator = page.getByRole("option", {name: "=", exact: true});
        this.NotEqualOperator = page.getByRole("option", {name: "!="});
        this.GreaterThanOperator = page.getByRole("option", {name: ">", exact: true});
        this.GreaterThanOrEqualOperator = page.getByRole("option", {name: ">="});
        this.LessThanOperator = page.getByRole("option", {name: "<", exact: true});
        this.LessThanOrEqualOperator = page.getByRole("option", {name: "<="});
        this.BetweenOperator = page.getByText("Between", {exact: true});
        this.NotBetweenOperator = page.getByText("Not Between");
        this.fcstCabinLevel = page.getByText("CABIN LEVEL").first();
        this.fcstValue = page.getByText("Value (%)").first();
        this.MinValue = page.getByLabel("Min", {exact: true});
        this.MaxValue = page.getByLabel("Max", {exact: true});
        this.MinValuePercentage = page.getByLabel("Min (%)");
        this.MaxValuePercentage = page.getByLabel("Max (%)");
        this.bsfTotalLevel = page.getByText("TOTAL LEVEL").nth(1);
        this.bsfCabinLevel = page.getByText("CABIN LEVEL").nth(1);
        this.bsfDropdown = page.locator(".css-fbi3hj").nth(7);
        this.bsfValue = page.getByText("Value (%)").nth(1);
        this.overBookingTotalLevel = page.getByText("TOTAL LEVEL").nth(2);
        this.overBookingCabinLevel = page.getByText("CABIN LEVEL").nth(2);
        this.overBookingDropdown = page.locator(".css-fbi3hj").nth(8);
        this.overBookingValue = page.getByText("Value (%)").nth(2);
        this.seatsTotalLevel = page.getByText("TOTAL LEVEL").nth(3);
        this.seatsCabinLevel = page.getByText("CABIN LEVEL").nth(3);
        this.seatsDropdown = page.locator(".css-fbi3hj").nth(9);
        this.seatsValue = page.getByText("Value").nth(3);
        this.capacityTotalLevel = page.getByText("TOTAL LEVEL").nth(4);
        this.capacityCabinLevel = page.getByText("CABIN LEVEL").nth(4);
        this.capacityDropdown = page.locator(".css-fbi3hj").nth(10);
        this.capacityValue = page.getByText("Value").nth(4);
        this.resetButton = page.getByLabel("Search Criteria").getByRole("button", {name: "Reset"});
        this.startDate = page.locator("label")
            .locator("input[type=\"date\"]")
            .nth(0);
        this.endDate = this.page
            .locator("label")
            .locator("input[type=\"date\"]")
            .nth(1);
        this.overlayLink = page.locator(".spark-link.css-1i6l3d5");
        this.agGridMenu = page.locator("//div[@col-id='physicalCapacity']//span[@class='ag-header-icon ag-header-cell-menu-button ag-header-menu-icon ag-header-menu-always-show']//span[@role='presentation']");
        this.collapseColumn = page.getByText("Collapse All Row Groups");
        this.ValueInDropdown = page.locator("//li[@class='css-1flnq98']").nth(0);
        this.cabinGridcellValue = page.locator("//div[@col-id='cabin'] [@role='gridcell']");
        this.manualToggle = page.locator(".spark-toggle-switch__handle").first();
        this.agGridContainer = page.locator("//div[@class='ag-root-wrapper ag-ltr ag-layout-normal']");
        this.fcstTlCellValue = page.locator("//div[contains(@class, 'ag-row-footer')]//div[contains(@class, 'ag-cell')] [@col-id=\"expectedNetLoadFactor\"]");
        this.fcstClCellValue = page.locator("//div[@col-id=\"expectedNetLoadFactor\"] [@role=\"gridcell\"]");
        this.bsfTlCellValue = page.locator("//div[contains(@class, 'ag-row-footer')]//div[contains(@class, 'ag-cell')] [@col-id=\"currentLoadFactor\"]");
        this.bsfClCellValue = page.locator("//div[@col-id=\"currentLoadFactor\"] [@role=\"gridcell\"]");
        this.overBookingTlCellValue = page.locator("//div[contains(@class, 'ag-row-footer')]//div[contains(@class, 'ag-cell')] [@col-id=\"overbooking\"]");
        this.overBookingClCellValue = page.locator("//div[@col-id=\"overbooking\"] [@role=\"gridcell\"]");
        this.seatsTlCellValue = page.locator("//div[contains(@class, 'ag-row-footer')]//div[contains(@class, 'ag-cell')] [@col-id=\"seatsAvailResSys\"]");
        this.seatsClCellValue = page.locator("//div[@col-id=\"seatsAvailResSys\"] [@role=\"gridcell\"]");
        this.capacityTlCellValue = page.locator("//div[contains(@class, 'ag-row-footer')]//div[contains(@class, 'ag-cell')] [@col-id=\"physicalCapacity\"]");
        this.capacityClCellValue = page.locator("//div[@col-id=\"physicalCapacity\"] [@role=\"gridcell\"]");
        this.cancelButton = page.getByRole('button', {name: 'Cancel'});
        this.analysisTab = page.getByRole('tab', {name: 'Analysis'});

    }

    async readStartDate(): Promise<string> {
        return await this.startDate.inputValue();
    }

    async readEndDate(): Promise<string> {
        return await this.endDate.inputValue();
    }

    async departureDateSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.searchByDropdown.click();
        await this.departureDateOption.click();
        await this.departureDateDropdown.click();
    }

    async dtdSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.searchByDropdown.click();
        await this.dtdOption.click();
        await this.daysToDepartureDropdown.click();
    }

    async goToShowAllCriteriaPage(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
    }

    async cabinSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.cabinDropDown.click();

    }

    async fcstTotalLevelSelection(): Promise<void> {

        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.fcstTotalLevel.click();
        await this.fcstDropdown.click();
    }

    async fcstCabinLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.fcstCabinLevel.click();
        await this.fcstDropdown.click();
    }

    async bsfTotalLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.bsfTotalLevel.click();
        await this.bsfDropdown.click();
    }

    async bsfCabinLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.bsfCabinLevel.click();
        await this.bsfDropdown.click();
    }

    async overBookingTotalLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.overBookingTotalLevel.click();
        await this.overBookingDropdown.click();
    }

    async overBookingCabinLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.overBookingCabinLevel.click();
        await this.overBookingDropdown.click();
    }

    async seatsTotalLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.seatsTotalLevel.click();
        await this.seatsDropdown.click();
    }

    async seatsCabinLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.seatsCabinLevel.click();
        await this.seatsDropdown.click();
    }

    async capacityTotalLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.capacityTotalLevel.click();
        await this.capacityDropdown.click();
    }

    async capacityCabinLevelSelection(): Promise<void> {
        await this.showAllCriteriaLink.click();
        await this.resetButton.click();
        await this.capacityCabinLevel.click();
        await this.capacityDropdown.click();
    }
}
