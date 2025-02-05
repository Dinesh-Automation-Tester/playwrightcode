import { MongoClient } from "mongodb";
import { expect, test } from "@playwright/test";
import { UserManagementSection } from "./user-access-request.po";
import usersMock from "../../../../fixtures/admin/user-management/users";
import PreferencesMock from "../../../../fixtures/admin/user-management/preferences";
import { ROUTES_ADMIN_USER_MANAGEMENT_ACCESS_REQUESTS } from "../../../../../../src/utils/Constants";

let client: any;
let db: any;

test.describe("User Management Functionality", () => {

  test.beforeAll(async () => {
    try {
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
    } catch (error) {
      console.error("Error during setup:", error);
      throw error;
    }
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES_ADMIN_USER_MANAGEMENT_ACCESS_REQUESTS);
    await page.waitForLoadState("networkidle");
  });

  test.afterAll(async () => {
    try {

      if (!db) {
        console.error("Database connection not initialized. Skipping cleanup.");
        return;
      }

      const userCollection = db.collection("User");
      const preferencesCollection = db.collection("Preferences");

      await preferencesCollection.deleteMany({ userName: { $in: PreferencesMock.map(pref => pref.userName) } });
      await userCollection.deleteMany({ userName: { $in: usersMock.map(user => user.userName) } });
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    } finally {

      if (client && client.topology && client.topology.isConnected()) {
        await client.close();
      }
    }
  });

  test("should verify the user management gridHeaders and click on the each columns from grid and count the columns count- access request tab ", async ({
                                                                                                                                                          page,
                                                                                                                                                        }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.usersManagementGridHeaders();
    await userManagement.gridHeadersCounts();
  });
  test("should verify the filtering working properly in the filter option-access request tab", async ({
                                                                                                        page,
                                                                                                      }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.filterColumnValues();
  });
  test("should verify the pin right and no pin column working properly in the filter option-access request tab", async ({
                                                                                                                          page,
                                                                                                                        }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.pinRightColumnAndNoPinColumn();
  });
  test("should verify the pin left column working properly in the filter option-access request tab", async ({
                                                                                                              page,
                                                                                                            }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.pinLeftColumn();
  });
  test("should verify the choose column options working properly in the filter option-access request tab", async ({
                                                                                                                    page,
                                                                                                                  }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.chooseColumnInFilter();
  });

  test("should verify the reset column options working properly in the filter option-access request tab", async ({
                                                                                                                   page,
                                                                                                                 }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.resetColumnOptions();
  });

  test("should verify the functionality of approve user actions", async ({
                                                                           page,
                                                                         }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.approveUserFunction();
  });

  test("Should verify  the selectRoleOptions from access request tab", async ({
                                                                                page,
                                                                              }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.approveUser.click();
    await userManagement.selectRoles.selectOption("ROLE_ADMIN");
    await userManagement.approveUserButton.click();
    await page.waitForTimeout(1000);
    expect(await userManagement.successMsg.isVisible()).toBe(true);
  });

  test("should verify the functionality of the app cancel user actions", async ({
                                                                                  page,
                                                                                }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.approveUser.click();
    await page.waitForLoadState("networkidle");
    await userManagement.cancelButton.click();
  });

  test("should verify the functionality of the reject user actions", async ({
                                                                              page,
                                                                            }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.rejectUser.click();
    await userManagement.rejectUserButton.click();
    await page.waitForTimeout(1000);
    expect(await userManagement.rejectMsg.isVisible()).toBe(true);
  });

  test("should verify the functionality of the reject cancel user actions", async ({
                                                                                     page,
                                                                                   }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.rejectUser.click();
    await userManagement.cancelButton.click();
  });

  test("should verify if the export option triggers a file download in the access request tab", async ({
                                                                                                         page,
                                                                                                       }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    expect(await userManagement.downloadFile.isVisible()).toBe(true);
    await userManagement.downloadFile.click();
  });

  test("should verify the print option opens the print page in the access request tab", async ({
                                                                                                 page,
                                                                                               }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.printOperation();
  });

  test("should verify the approved user access and populate in the user table", async ({
                                                                                         page,
                                                                                       }) => {
    const userManagement = new UserManagementSection(page);
    await userManagement.accessRequestsTab.click();
    await userManagement.approvedUserVerification();
  });
});
