import config from "../../../playwright.config";
import {expect, test} from "@playwright/test";
import {ROUTES_ADMIN_USER_MANAGEMENT, ROUTES_FLIGHT_OVERVIEW, ROUTES_HOME, ROUTES_PROFILE,} from "../../../src/utils/Constants";

test.describe("CRO Smoke Tests Suite", () => {
    const baseURL = config.use.baseURL;

    test.beforeEach(async ({page}) => {
        await page.goto(ROUTES_HOME);
    });

    test.describe("Flight Overview Screen", async () => {
        test("Should display the flight overview UI correctly", async ({
                                                                           page,
                                                                       }) => {

            await expect(
                page.getByRole("link", {name: "Flight", exact: true})
            ).toBeVisible();

            await page.getByRole("link", {name: "Flight", exact: true}).click();
            await page.waitForURL(baseURL + ROUTES_FLIGHT_OVERVIEW, {timeout: 5000});

            expect(page.url()).toBe(baseURL + ROUTES_FLIGHT_OVERVIEW);

            await page.getByRole("tab", {name: "OVERVIEW"}).click();
            await expect(page.getByRole("button", {name: "APPLY"})).toBeVisible();
        });

        test("Should successfully fetch and display flight data from the API", async ({
                                                                                          request,
                                                                                      }) => {
            const response = await request.get(baseURL + "/api/cro/config/legs");
            expect(response.status()).toBe(200);

            const data = await response.json();
            expect(data).not.toEqual([]);
        });
    });

    test("User Management Screen", async ({page, request}) => {
        await page.goto(ROUTES_ADMIN_USER_MANAGEMENT);

        const response = await request.get(baseURL + "/api/cro/user/authorities");
        expect(response.status()).toBe(200);

        // Check if the user has the required authority to access the page
        const data = await response.json();
        expect(data).not.toEqual([]);
        const userManagementAuthority = data.find((item) => {
            if (item.category === "admin-user-management") {
                return item;
            }
        });
        const userManagementAuthorityValue = userManagementAuthority?.authority;

        if (!userManagementAuthorityValue) {
            console.log("skip test, check 401 page");
            await expect(
                page.getByRole("heading", {name: "401 - Unauthorized"})
            ).toBeVisible();
            return;
        }

        await expect(
            page.getByRole("heading", {name: "User management"})
        ).toBeVisible();
        expect(page.url()).toBe(baseURL + ROUTES_ADMIN_USER_MANAGEMENT);

        await expect(page.getByText("Email Address")).toBeVisible();
        await expect(page.getByText("Name")).toBeVisible();
        await expect(page.getByText("Location")).toBeVisible();
        await expect(page.getByText("Id")).toBeVisible();
        await expect(page.getByText("Current Role")).toBeVisible();
    });

    test("Profile Screen", async ({page}) => {
        await page.goto(ROUTES_PROFILE);

        await expect(
            page.getByRole("heading", {name: "My profile"})
        ).toBeVisible();

        expect(page.url()).toBe(baseURL + ROUTES_PROFILE);
    });

    test.describe("API Validations", async () => {
        test("Should verify the user API returns the correct user details", async ({
                                                                                       page,
                                                                                   }) => {
            const response = await page.request.get(baseURL + "/api/cro/user");
            expect(response.status()).toBe(200);

            const data = await response.json();
            expect(data).not.toEqual([]);

            expect(data).toHaveProperty("email");
            expect(data).toHaveProperty("firstName");
            expect(data).toHaveProperty("lastName");
            expect(data).toHaveProperty("userName");
            expect(data).toHaveProperty("iataCode");

            expect(data).toHaveProperty("roles");
            expect(data.roles).toBeInstanceOf(Array);

            expect(data).toHaveProperty("authorities");
            expect(data.authorities).toBeInstanceOf(Array);
        });

        test("Should ensure the preferences API provides the correct user preferences", async ({
                                                                                                   page,
                                                                                               }) => {
            const response = await page.request.get(
                baseURL + "/api/cro/user/preferences"
            );
            expect(response.status()).toBe(200);

            const data = await response.json();
            expect(data).not.toEqual([]);

            expect(data).toHaveProperty("dateTimeSettings");
            expect(data.dateTimeSettings[0].name).toBe("dateFormat");
            expect(data.dateTimeSettings[1].name).toBe("timeFormat");
            expect(data.dateTimeSettings[2].name).toBe("timeZone");

            expect(data).toHaveProperty("legs");
            expect(data.legs).toBeInstanceOf(Array);

            expect(data).toHaveProperty("markets");
            expect(data.markets).toBeInstanceOf(Array);

            expect(data).toHaveProperty("userName");
            expect(data).toHaveProperty("workflowSettings");
            expect(data.workflowSettings).toHaveProperty("flightAnalysis");

            expect(data.workflowSettings.flightAnalysis[0].name).toBe(
                "defaultSearchDays"
            );
            expect(data.workflowSettings.flightAnalysis[1].name).toBe(
                "defaultMetric"
            );
        });

        test("Should confirm the authorities API lists the correct user authorities", async ({
                                                                                                 page,
                                                                                             }) => {
            const response = await page.request.get(
                baseURL + "/api/cro/user/authorities"
            );
            expect(response.status()).toBe(200);

            const data = await response.json();
            expect(data).not.toEqual([]);
            expect(data[0].authority).toBeDefined();
            expect(data[0].category).toBeDefined();
            expect(data[0].subcategory).toBeDefined();
        });
    });
});
