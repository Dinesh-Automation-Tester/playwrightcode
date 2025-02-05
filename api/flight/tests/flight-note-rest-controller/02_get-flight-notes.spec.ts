import { expect, test } from "@playwright/test";
import Ajv from "ajv";

import { flightNotesSchema } from "../../fixtures/flight-notes-schema";
import { flightNotesUrl, flightsUrl } from "../../utils/flight-url";

test.describe("GET API Request : Test the endpoint that retrieves the flight notes", () => {
  let url: string;
  let urlWithInvalidParams: string;

  test.beforeAll("GET - Flight ID for getting notes", async ({ request }) => {
    const getAPIResponse = await request.get(flightsUrl);
    const getAPIResponseBody = await getAPIResponse.json();

    if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
      const flightId = getAPIResponseBody[0]?.flightId;
      const legId = getAPIResponseBody[0]?.legId;
      const encodedFlightId = encodeURIComponent(flightId);
      const encodedLegId = encodeURIComponent(legId);

      url = `${flightNotesUrl}s?flightId=${encodedFlightId}&legId=${encodedLegId}`;
      urlWithInvalidParams = `${flightNotesUrl}s?flight=${encodedFlightId}&leg=${encodedLegId}`;
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

        const validate = ajv.compile(flightNotesSchema);
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
    test("Not Found: Should return status code 400", async ({ request }) => {
      try {
        const getAPIResponse = await request.get(urlWithInvalidParams);

        expect(getAPIResponse.status()).toBe(400);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });

    test("Invalid HTTP Method: Should return status code 405", async ({
      request,
    }) => {
      try {
        const getAPIResponse = await request.post(url, {
          data: { flightNotesSchema },
        });

        expect(getAPIResponse.status()).toBe(405);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
