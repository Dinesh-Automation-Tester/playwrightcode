import { expect, test } from "@playwright/test";
import Ajv from "ajv";

import { flightOptimizationInvalidData } from "../../fixtures/flight-optimization-data";
import { flightOptSchema } from "../../fixtures/flight-optimization-schema";
import { flightOptimizationUrl, flightsUrl } from "../../utils/flight-url";

test.describe("POST API Request : Test the endpoint that optimize a flight", () => {
  let flightOptimizationData: any;

  test.beforeAll("GET - Flight Optimization Data", async ({ request }) => {
    const getAPIResponse = await request.get(flightsUrl);
    const getAPIResponseBody = await getAPIResponse.json();

    if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
      flightOptimizationData = [
        {
          flightId: getAPIResponseBody[0]?.flightId,
          flightNumber: getAPIResponseBody[0]?.flightNumber,
          departureDate: getAPIResponseBody[0]?.departureDate,
        },
      ];
    }
  });

  test.describe("Positive Tests", () => {
    test("Should return status code 200", async ({ request }) => {
      try {
        const postAPIResponse = await request.post(flightOptimizationUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightOptimizationData,
        });
        expect(postAPIResponse.ok()).toBeTruthy();
        expect(postAPIResponse.status()).toBe(200);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });

    test("Should match the response schema", async ({ request }) => {
      const ajv = new Ajv();
      let postAPIResponseBody: any;
      try {
        const postAPIResponse = await request.post(flightOptimizationUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightOptimizationData,
        });
        postAPIResponseBody = await postAPIResponse.json();

        const validate = ajv.compile(flightOptSchema);
        const valid = validate(postAPIResponseBody);

        if (!valid) {
          console.error("Schema validation error", validate.errors);
        }

        expect(valid).toBeTruthy();
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });

  test.describe("Negative Tests", () => {
    test("Invalid HTTP Method: Should return status code 405", async ({
      request,
    }) => {
      try {
        const getAPIResponse = await request.get(flightOptimizationUrl);

        expect(getAPIResponse.status()).toBe(405);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });

    test("Bad Request: Should return status code 400", async ({ request }) => {
      try {
        const postAPIResponse = await request.post(flightOptimizationUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightOptimizationInvalidData,
        });

        expect(postAPIResponse.status()).toBe(400);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
