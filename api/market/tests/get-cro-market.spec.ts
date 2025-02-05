import { expect, test } from "@playwright/test";
import Ajv from "ajv";

import { marketSchema } from "../fixtures/market-rest-schema";
import { marketURL } from "../utils/market-urls";

test.describe("GET API Request : Test the endpoint that retrieves the markets", () => {
  test.describe("Positive Tests", () => {
    test("Should return status code 200", async ({ request }) => {
      try {
        const getAPIResponse = await request.get(marketURL);

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
        const getAPIResponse = await request.get(marketURL);
        getAPIResponseBody = await getAPIResponse.json();

        const validate = ajv.compile(marketSchema);
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
        const getAPIResponse = await request.get(`${marketURL}/invalidId`);

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
        const getAPIResponse = await request.post(marketURL, {
          data: marketSchema,
        });

        expect(getAPIResponse.status()).toBe(405);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
