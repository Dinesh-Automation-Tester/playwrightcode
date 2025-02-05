import { type Locator, type Page, expect } from "@playwright/test";

export class UserManagementSection {
  readonly page: Page;
  readonly usersTab: Locator;
  readonly userManagementMenuLink: Locator;
  readonly userManagementHeader: Locator;
  readonly adminLink: Locator;
  readonly accessRequestsTab: Locator;
  readonly marketsLegsButton: Locator;
  readonly editRoleButton: Locator;
  readonly deleteRoleButton: Locator;
  readonly UserManagementTittle: Locator;
  readonly downloadFile: Locator;
  readonly editRoleModalClose: Locator;
  readonly printOption: Locator;
  readonly dropdownLocator: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly userPreferenceSaveVerification: Locator;
  readonly rowData: Locator;
  readonly deleteConfirmButton: Locator;
  readonly dropDownHold: Locator;
  readonly marketSelector: Locator;
  readonly legSelector: Locator;
  readonly approveUser: Locator;
  readonly approveUserButton: Locator;
  readonly successMsg: Locator;
  readonly roleChangeSuccessMsg: Locator;
  readonly rejectUser: Locator;
  readonly rejectUserButton: Locator;
  readonly rejectMsg: Locator;
  readonly downloadFile1: Locator;
  readonly printOption1: Locator;
  readonly gridHeadersName: Locator;
  readonly gridHeadersEmail: Locator;
  readonly gridHeadersLocation: Locator;
  readonly gridHeadersId: Locator;
  readonly gridHeadersRole: Locator;
  readonly gridHeadersActions: Locator;
  readonly UserManagementHeaderText: Locator;
  readonly selectRoles: Locator;
  readonly marketDropdownOptions: Locator;
  readonly legDropdownOptions: Locator;
  readonly dropDownSelect: Locator;
  readonly ascIndicator: Locator;
  readonly dscIndicator: Locator;
  readonly asc: Locator;
  readonly desc: Locator;
  readonly menuTrigger: Locator;
  readonly gridCell: Locator;
  readonly coloumn_filter: Locator;
  readonly coloumn_filter_checkbox: Locator;
  readonly column_filter_uncheck: Locator;
  readonly pincolumnsOption: Locator;
  readonly pinLeftOption: Locator;
  readonly pinRightOption: Locator;
  readonly undoPinOption: Locator;
  readonly columnIndex_1: Locator;
  readonly columnIndex_2: Locator;
  readonly columnIndex_6: Locator;
  readonly chooseColumn: Locator;
  readonly chooseColumn_CheckBox: Locator;
  readonly resetColumn: Locator;
  readonly nameCellLocator: Locator;
  readonly emailCellLocator: Locator;
  readonly locationCellLocator: Locator;
  readonly idCellLocator: Locator;
  readonly currentRoleCellLocator: Locator;
  readonly marketLeg_Dropdown: Locator;
  readonly market_leg_Dropdown_Options: Locator;
  readonly noPinOption: Locator;
  readonly emailMenu: Locator;
  readonly editRoleTextContent: Locator;
  readonly deleteRoleTextContent1: Locator;
  readonly deleteRoleTextContent2: Locator;
  readonly manageUsers: Locator;
  readonly currentRole: Locator;
  readonly ProfileName: Locator;
  readonly userNames: Locator;
  readonly loggedUserText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userManagementMenuLink = page.getByRole("link", {
      name: "User Management",
    });
    this.adminLink = page.getByRole("link", { name: "Admin" });

    this.usersTab = page.getByRole("tab", { name: "Users" });

    this.accessRequestsTab = page.getByRole("tab", { name: /Access requests/ });

    this.userManagementHeader = page.getByRole("heading", {
      name: "User Management",
    });
    this.rowData = page.locator(".ag-cell.ag-column-first ").nth(0);
    this.marketsLegsButton = page
      .locator("[col-id='actions'] .spark-icon-cog")
      .nth(0);
    this.editRoleButton = page
      .locator("[col-id='actions'] .spark-icon-pencil")
      .nth(0);
    this.deleteRoleButton = page
      .locator("[col-id='actions'] .spark-icon-trash")
      .nth(0);
    this.deleteConfirmButton = page.getByRole("button", {
      name: "Delete",
      exact: true,
    });
    this.UserManagementTittle = page.getByRole("heading", {
      name: "User management",
    });
    this.editRoleModalClose = page.getByRole("button", { name: "Close Modal" });
    this.downloadFile = page.getByLabel("Download Excel file").locator("div");
    this.printOption = page.getByLabel("Print").locator("div");
    this.dropdownLocator = page.getByLabel("DefaultFlight AnalystDemand");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.userPreferenceSaveVerification = page.getByText(
      "User preferences updated successfully",
    );
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.dropDownHold = page.getByRole("listbox").getByRole("listitem");
    this.marketSelector = page.getByPlaceholder("Enter markets");
    this.legSelector = page.getByPlaceholder("Enter leg");
    this.marketDropdownOptions = page.locator("//ul[@role='listbox']").nth(0);
    this.legDropdownOptions = page.locator("//ul[@role='listbox']");
    this.dropDownSelect = page.locator(".css-1flnq98");
    this.ascIndicator = page
      .locator(
        ".ag-header-cell-label > .ag-sort-indicator-container > span:nth-child(2) > .ag-icon",
      )
      .first();
    this.dscIndicator = page
      .locator(
        ".ag-header-cell-label > .ag-sort-indicator-container > span:nth-child(3) > .ag-icon",
      )
      .first();
    this.asc = page.getByText("Sort Ascending");
    this.desc = page.getByText("Sort Descending");
    this.menuTrigger = page
      .locator(".ag-cell-label-container > span > .ag-icon")
      .first();
    this.gridCell = page.locator(
      ".ag-cell-not-inline-editing ag-cell-normal-height ag-column-first spark-text-left ag-cell-range-left ag-cell-value",
    );
    this.coloumn_filter = page.getByText("Column Filter");
    this.column_filter_uncheck = page.getByLabel("(Select All)");
    this.coloumn_filter_checkbox = page
      .locator("//input[@class='ag-input-field-input ag-checkbox-input']")
      .nth(7);
    this.pincolumnsOption = page.getByText("Pin Column");
    this.pinRightOption = page.getByText("Pin Right");
    this.pinLeftOption = page.getByText("Pin Left");
    this.noPinOption = page.getByText("No Pin");
    this.approveUser = page.locator("[col-id='actions'] .spark-success").nth(0);
    this.approveUserButton = page.locator(
      "//button[@class='spark-btn spark-btn--md spark-progress spark-btn-group-primary']",
    );
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.rejectUser = page.locator("[col-id='actions'] .spark-danger").nth(0);
    this.rejectUserButton = page.locator(
      "//button[@class='spark-btn spark-btn--md spark-progress spark-btn--negative spark-btn-group-primary']",
    );
    this.roleChangeSuccessMsg = page.getByText(
      "User role updated successfully",
    );
    this.successMsg = page.getByText("User approved successfully");
    this.rejectMsg = page.getByText("User rejected successfully");
    this.downloadFile1 = page.getByLabel("Download Excel file").locator("div");
    this.printOption1 = page.getByLabel("Print").locator("div");
    this.gridHeadersName = page.getByRole("columnheader", { name: "Name" });
    this.gridHeadersEmail = page.getByRole("columnheader", {
      name: "Email Address",
    });
    this.gridHeadersLocation = page.getByRole("columnheader", {
      name: "Location",
    });
    this.gridHeadersId = page.getByRole("columnheader", { name: "id" });
    this.gridHeadersRole = page.getByRole("columnheader", { name: "Role" });
    this.gridHeadersActions = page.getByRole("columnheader", {
      name: "Actions",
    });
    this.UserManagementHeaderText = page.getByText(
      "The following data was obtained from the Community Portal database and cannot be edited. Please contact the Community Portal team if you see that some of this data is incorrect.",
    );
    this.selectRoles = page.getByLabel("AdminDefaultFlight");
    this.columnIndex_1 = page.locator("//div[@aria-colindex='1']").nth(0);
    this.columnIndex_2 = page.locator("//div[@aria-colindex='2']").nth(0);
    this.columnIndex_6 = page.locator("//div[@aria-colindex='6']").nth(0);
    this.chooseColumn = page
      .getByLabel("Column Menu")
      .getByText("Choose Columns");
    this.chooseColumn_CheckBox = page
      .getByLabel("Name Column")
      .getByLabel("Press SPACE to toggle");
    this.resetColumn = page.getByText("Reset Columns", { exact: true });
    this.nameCellLocator = page.locator("div[aria-colindex='1'].ag-cell-value");
    this.emailCellLocator = page.locator(
      "div[aria-colindex='2'].ag-cell-value",
    );
    this.locationCellLocator = page.locator(
      "div[aria-colindex='3'].ag-cell-value",
    );
    this.idCellLocator = page.locator("div[aria-colindex='4'].ag-cell-value");
    this.currentRoleCellLocator = page.locator(
      "div[aria-colindex='5'].ag-cell-value",
    );
    this.marketLeg_Dropdown = page.locator(".css-1xm32e0.has-label.spark-mar-b-2");
    this.market_leg_Dropdown_Options = page.locator(`.css-1flnq98`);
    this.undoPinOption = page
      .locator(".ag-cell-label-container > span > .ag-icon")
      .nth(5);
    this.emailMenu = page
      .locator(".ag-cell-label-container > span > .ag-icon")
      .nth(1);
    this.editRoleTextContent = page.getByText("Please select the role you");
    this.deleteRoleTextContent1 = page.getByText("If you delete this user he");
    this.deleteRoleTextContent2 = page.getByText("Are you sure you want to");
    this.manageUsers = page.locator("//*[@id='manage-users']");
    this.currentRole = page.locator(".spark-select__input");
    this.ProfileName = page.getByRole("menuitem", { name: "Local User" }).getByLabel("Local User");
    this.userNames = page.locator("//div[@col-id='firstName']");
    this.loggedUserText = page.locator("//div[@col-id='actions']");
  }

  async userManagementGridHeaders(): Promise<void> {
    await this.gridHeadersName.click();
    expect(await this.gridHeadersEmail.isVisible()).toBe(true);
    await this.gridHeadersEmail.click();
    expect(await this.gridHeadersLocation.isVisible()).toBe(true);
    await this.gridHeadersLocation.click();
    expect(await this.gridHeadersId.isVisible()).toBe(true);
    await this.gridHeadersId.click();
    expect(await this.gridHeadersRole.isVisible()).toBe(true);
    await this.gridHeadersRole.click();
    expect(await this.gridHeadersActions.isVisible()).toBe(true);
    await this.gridHeadersActions.click();
  }

  async clickMarketAndLegRowAction(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    expect(await this.marketsLegsButton.isVisible()).toBe(true);
    await this.marketsLegsButton.click();
    expect(await this.UserManagementTittle.isVisible()).toBe(true);
  }

  async gridHeadersCounts(): Promise<void> {
    const columnHeaderSelector = ".ag-header-cell-comp-wrapper";
    const columnCount = await this.page.evaluate((selector) => {
      const headers = document.querySelectorAll(selector);
      return headers.length;
    }, columnHeaderSelector);
    expect(columnCount == 6).toBeTruthy();
  }

  async openAndCloseEditRoleModal(): Promise<void> {
    await this.editRoleButton.click();
    await this.editRoleModalClose.waitFor({ state: "visible" });
    expect(await this.editRoleModalClose.isVisible()).toBeTruthy();
  }

  async openAndCloseDeleteRoleModal(): Promise<void> {
    await this.deleteRoleButton.click();
    await this.editRoleModalClose.waitFor({ state: "visible" });
  }

  async printOperation(): Promise<void> {
    expect(await this.printOption.isVisible()).toBe(true);
    await this.printOption.click();
    const page1Promise = this.page.waitForEvent("popup");
    await page1Promise;
  }

  async openLegsDropDown(): Promise<void> {
    await this.legSelector.click();
    await this.dropDownHold.click();
  }

  async filterColumnValues(): Promise<void> {
    const filterData = await this.rowData.textContent();
    await this.menuTrigger.click();
    await this.coloumn_filter.click();
    await this.column_filter_uncheck.click();
    await this.page.getByPlaceholder("Search...").fill(filterData);
    await this.coloumn_filter_checkbox.click();
    await this.rowData.click();
    expect(filterData.includes(await this.rowData.textContent())).toBe(true);
  }

  async pinRightColumnAndNoPinColumn(): Promise<void> {
    const beforePinRight = await this.columnIndex_1.textContent();
    await this.menuTrigger.click();
    await this.pincolumnsOption.click();
    await this.pinRightOption.click();
    const afterPinRight = await this.columnIndex_6.textContent();
    expect(afterPinRight == beforePinRight).toBeTruthy();
    await this.undoPinOption.click();
    await this.pincolumnsOption.click();
    await this.noPinOption.click();
    expect(afterPinRight == beforePinRight).toBeTruthy();
  }

  async pinLeftColumn(): Promise<void> {
    const beforePinLeft = await this.columnIndex_2.textContent();
    await this.emailMenu.click();
    await this.pincolumnsOption.click();
    await this.pinLeftOption.click();
    const afterPinLeft = await this.columnIndex_1.textContent();
    expect(afterPinLeft == beforePinLeft).toBeTruthy();
  }

  async chooseColumnInFilter(): Promise<void> {
    await this.menuTrigger.click();
    await this.chooseColumn.click();
    await this.chooseColumn_CheckBox.uncheck();
    expect(await this.columnIndex_1.isHidden()).toBeTruthy();
  }

  async resetColumnOptions(): Promise<void> {
    const beforeReset = await this.columnIndex_1.textContent();
    await this.menuTrigger.click();
    await this.pincolumnsOption.click();
    await this.pinRightOption.click();
    const afterRest = await this.columnIndex_6.textContent();
    await this.menuTrigger.click();
    await this.resetColumn.click();
    expect(afterRest == beforeReset).toBeTruthy();
  }

  async selectLegsOptions(): Promise<void> {
    await this.legDropdownOptions.waitFor({ state: "visible" });
    for (let i = 0; i <= 1; i++) {
      await this.dropDownSelect.nth(i).click();
    }
    await this.legSelector.click();
  }

  async loggedInUser(): Promise<void> {
    const ProfileUser = await this.ProfileName.innerText();
    const UserValue = await this.userNames.allInnerTexts();
    for (let i = 0; i <= UserValue.length; i++) {
      if (UserValue[i] == ProfileUser) {
        const UserLoginText = await this.loggedUserText.nth(i).innerText();
        expect(UserLoginText == "Logged in user");
      }
    }
  }

}
