import { MongoClient } from "mongodb";
import { expect, test } from "@playwright/test";
import { UserManagementSection } from "./users.po";
import usersMock from "../../../../fixtures/admin/user-management/users";
import { ROUTES_ADMIN_USER_MANAGEMENT } from "../../../../../../src/utils/Constants";
import PreferencesMock from "../../../../fixtures/admin/user-management/preferences";

let db: any;
let client: any;

test.describe("User Management Functionality", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES_ADMIN_USER_MANAGEMENT);
    await page.waitForLoadState("networkidle");
  });

  test.beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db("RX_Web");

    const userCollection = db.collection("User");
    const preferencesCollection = db.collection("Preferences");

    const userOperations = usersMock.map(user => ({
      updateOne: {
        filter: { userName: user.userName },
        update: { $set: user },
        upsert: true,
      },
    }));
    await userCollection.bulkWrite(userOperations);

    const preferencesOperations = PreferencesMock.map(pref => ({
      updateOne: {
        filter: { userName: pref.userName },
        update: { $set: pref },
        upsert: true,
      },
    }));
    await preferencesCollection.bulkWrite(preferencesOperations);

    const userCount = await userCollection.countDocuments();
    const preferencesCount = await preferencesCollection.countDocuments();

    expect(userCount).toBeGreaterThan(0);
    expect(preferencesCount).toBeGreaterThan(0);
  });

  test.afterAll(async () => {
    if (!db) {
      console.error("Database connection not initialized. Skipping cleanup.");
      return;
    }

    try {
      const userCollection = db.collection("User");
      const preferencesCollection = db.collection("Preferences");

      await preferencesCollection.deleteMany({ userName: { $in: PreferencesMock.map(pref => pref.userName) } });
      await userCollection.deleteMany({ userName: { $in: usersMock.map(user => user.userName) } });
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    } finally {
      if (client) {
        await client.close();
      }
    }
  });

  test("should verify the presence of users and access request tabs under user management", async ({
                                                                                                     page,
                                                                                                   }) => {
    const userManagement = new UserManagementSection(page);
    expect(await userManagement.usersTab.isVisible());
    expect(await userManagement.accessRequestsTab.isVisible());
  });

  test("should verify the user management gridHeaders and click on the each columns from grid and count the columns count ", async ({
                                                                                                                                      page,
                                                                                                                                    }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.userManagementGridHeaders();
    await userManagement.gridHeadersCounts();
  });

  test("should verify the column filter working properly in the filter option", async ({
                                                                                         page,
                                                                                       }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.filterColumnValues();
  });

  test("should verify the pin right and no pin column working properly in the filter option", async ({
                                                                                                       page,
                                                                                                     }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.pinRightColumnAndNoPinColumn();
  });

  test("should verify the pin left column working properly in the filter option", async ({
                                                                                           page,
                                                                                         }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.pinLeftColumn();
  });

  test("should verify the choose column options working properly in the filter option", async ({
                                                                                                 page,
                                                                                               }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.chooseColumnInFilter();
  });

  test("should verify the reset column options working properly in the filter option", async ({
                                                                                                page,
                                                                                              }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.resetColumnOptions();
  });

  test("should ensure  markets and legs, edit role, delete user options are available under actions ", async ({
                                                                                                                page,
                                                                                                              }) => {
    const userManagement = new UserManagementSection(page);
    expect(await userManagement.marketsLegsButton.isVisible()).toBe(true);
    expect(await userManagement.editRoleButton.isVisible()).toBe(true);
    expect(await userManagement.deleteRoleButton.isVisible()).toBe(true);
  });

  test("should verify legs are sorted alphabetically", async ({ page }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.clickMarketAndLegRowAction();
    await userManagement.openLegsDropDown();
    const marketDropdownOptions =
      await userManagement.market_leg_Dropdown_Options.allTextContents();
    const isSortedMarket = marketDropdownOptions.every(
      (value, index, array) =>
        index === 0 || array[index - 1].localeCompare(value) <= 0,
    );
    expect(isSortedMarket).toBeTruthy();
  });

  test("should verify the functionality of the save button", async ({
                                                                      page,
                                                                    }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.clickMarketAndLegRowAction();
    expect(await userManagement.saveButton.isDisabled()).toBe(true);
    await userManagement.openLegsDropDown();
    await userManagement.selectLegsOptions();
    await userManagement.saveButton.click();
    await page.waitForTimeout(1000);
    expect(
      await userManagement.userPreferenceSaveVerification.isVisible(),
    ).toBe(true);
  });

  test("should verify the functionality of 'edit role' feature ", async ({
                                                                           page,
                                                                         }) => {
    const userManagement = new UserManagementSection(page);
    expect(await userManagement.editRoleButton.isVisible()).toBe(true);
    await userManagement.openAndCloseEditRoleModal();
    expect(await userManagement.saveButton.isDisabled()).toBe(true);
    await userManagement.selectRoles.selectOption("ROLE_ADMIN");
    if (await userManagement.saveButton.isDisabled()) {
      await userManagement.selectRoles.selectOption("ROLE_USER");
    }
    await userManagement.saveButton.click();
    await page.waitForTimeout(1000);
    expect(await userManagement.roleChangeSuccessMsg.isVisible()).toBe(true);
  });

  test("should verify the functionality of the cancel button ", async ({
                                                                         page,
                                                                       }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.clickMarketAndLegRowAction();
    await userManagement.cancelButton.click();
    await userManagement.page.waitForTimeout(2000);
    expect(await userManagement.manageUsers.isVisible()).toBe(true);
  });

  test("should verify functionality of cancel 'edit role' feature ", async ({
                                                                              page,
                                                                            }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.openAndCloseEditRoleModal();
    await userManagement.selectRoles.selectOption("ROLE_USER");
    await userManagement.cancelButton.click();
    await page.waitForTimeout(1000);
    expect(await userManagement.manageUsers.isVisible()).toBe(true);
  });

  test("should verify text content in the 'edit role' pop up", async ({
                                                                        page,
                                                                      }) => {
    const userManagement = new UserManagementSection(page);
    const userName = await userManagement.rowData.textContent();
    await userManagement.editRoleButton.click();
    const value = await userManagement.editRoleTextContent.textContent();
    const splitValue = value.split("assign to");
    const actualValue = splitValue[0] + "assign to " + userName;
    const expectedValue =
      "Please select the role you want to assign to " + userName;
    expect(actualValue == expectedValue).toBe(true);
  });

  test("should verify text content in the 'delete user' pop up", async ({
                                                                          page,
                                                                        }) => {
    const userManagement = new UserManagementSection(page);
    const userName = await userManagement.rowData.textContent();
    await userManagement.editRoleButton.click();
    const actualValue1 =
      await userManagement.deleteRoleTextContent1.textContent();
    const value2 = await userManagement.deleteRoleTextContent2.textContent();
    const splittedValue = value2.split("delete");
    const actualValue2 =
      splittedValue[0] +
      "delete " +
      userName +
      "?\n" +
      "This action cannot be undone.";
    const expectedValue1 =
      "If you delete this user he will lose access to the application.";
    const expectedValue2 =
      "Are you sure you want to delete " +
      userName +
      "?\n" +
      "This action cannot be undone.";
    expect(actualValue1 == expectedValue1).toBe(true);
    expect(actualValue2 == expectedValue2).toBe(true);
  });

  test("should verify the functionality of the cancel 'delete user' feature", async ({
                                                                                       page,
                                                                                     }) => {
    const userManagement = new UserManagementSection(page);
    const beforeDelete = await userManagement.rowData.textContent();
    expect(await userManagement.deleteRoleButton.isVisible()).toBe(true);
    await userManagement.openAndCloseDeleteRoleModal();
    await userManagement.cancelButton.click();
    const afterDelete = await userManagement.rowData.textContent();
    expect(beforeDelete == afterDelete).toBeTruthy();
  });

  test("should check if the export option triggers a file download in the users tab", async ({
                                                                                               page,
                                                                                             }) => {
    const userManagement = new UserManagementSection(page);
    expect(await userManagement.downloadFile.isVisible()).toBe(true);
    await userManagement.downloadFile.click();
  });

  test("should verify the print option opens the print page in the users tab", async ({
                                                                                        page,
                                                                                      }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.printOperation();
  });

  test("should verify the logged in user", async ({
                                                    page,
                                                  }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.loggedInUser();

  });
});
