import { expect, test } from "@playwright/test";

import { flightManualToggleInvalidData } from "../../fixtures/flight-toggle-data";
import { flightManualToggleUrl, flightsUrl } from "../../utils/flight-url";

test.describe("PUT API Request - Test the endpoint that update flight manualToggle.", () => {
  let flightManualToggleData: any;

  test.beforeAll("GET - Flight Toggle Data", async ({ request }) => {
    const getAPIResponse = await request.get(flightsUrl);
    const getAPIResponseBody = await getAPIResponse.json();

    if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
      flightManualToggleData = {
        flightID: getAPIResponseBody[0]?.flightId,
        isManual: true,
      };
    }
  });

  test.describe("Positive Tests", () => {
    test("Update manualToggle with valid data should return status code 200", async ({
      request,
    }) => {
      try {
        const putAPIResponse = await request.put(flightManualToggleUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightManualToggleData,
        });

        expect(putAPIResponse.ok()).toBeTruthy();
        expect(putAPIResponse.status()).toBe(200);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });

  test.describe("Negative Tests", () => {
    test("Update flight manualToggle with invalid data should return status code 400", async ({
      request,
    }) => {
      try {
        const putAPIResponse = await request.put(flightManualToggleUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightManualToggleInvalidData,
        });

        expect(putAPIResponse.status()).toBe(400);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
