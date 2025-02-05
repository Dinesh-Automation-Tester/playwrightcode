import { expect, test } from "@playwright/test";
import Ajv from "ajv";

import { flightBidPriceSchema } from "../../fixtures/flight-bidprice-schema";
import { flightBidPriceUrl, flightsUrl } from "../../utils/flight-url";

test.describe("GET API Request : Test the endpoint that retrieves the Flight bid price", () => {
  let url: string;

  test.beforeAll("GET - Flight ID", async ({ request }) => {
    const getAPIResponse = await request.get(flightsUrl);
    const getAPIResponseBody = await getAPIResponse.json();

    if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
      const flightId = getAPIResponseBody[0]?.flightId;
      const encodedId = encodeURIComponent(flightId);
      url = `${flightBidPriceUrl}?flightId=${encodedId}`;
    }
  });

  test.describe("Positive Tests", () => {
    test("Should return status code 200", async ({ request }) => {
      try {
        const getAPIResponse = await request.get(url);
        expect(getAPIResponse.ok()).toBeTruthy();
        expect(getAPIResponse.status()).toBe(200);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });

    test("Should match the response schema", async ({ request }) => {
      const ajv = new Ajv();
      let getAPIResponseBody: any;
      try {
        const getAPIResponse = await request.get(url);
        getAPIResponseBody = await getAPIResponse.json();

        const validate = ajv.compile(flightBidPriceSchema);
        const valid = validate(getAPIResponseBody);

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
    test("Not Found: Should return status code 404", async ({ request }) => {
      try {
        const getAPIResponse = await request.get(
          `${flightBidPriceUrl}/invalidId`
        );

        expect(getAPIResponse.status()).toBe(404);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });

    test("Invalid HTTP Method: Should return status code 405", async ({
      request,
    }) => {
      try {
        const getAPIResponse = await request.post(flightBidPriceUrl, {
          data: flightBidPriceSchema,
        });

        expect(getAPIResponse.status()).toBe(405);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
