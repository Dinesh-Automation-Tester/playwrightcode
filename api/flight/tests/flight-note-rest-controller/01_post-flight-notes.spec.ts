import { expect, test } from "@playwright/test";
import { flightNotesUrl, flightsUrl } from "../../utils/flight-url";
import { flightNotesInvalidData } from "../../fixtures/flight-notes-data";


test.describe("POST API Request : Test the endpoint that creates a flight note", () => {
  let flightNotesData: any;

  test.beforeAll(
    "GET - Flight data for creating notes",
    async ({ request }) => {
      const getAPIResponse = await request.get(flightsUrl);
      const getAPIResponseBody = await getAPIResponse.json();

      if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
        flightNotesData = {
          flightId: getAPIResponseBody[0]?.flightId,
          legId: getAPIResponseBody[0]?.legId,
          note: "Note for testing purpose",
        };
      }
    }
  );

  test.describe("Positive Tests", () => {
    test("Should return status code 200", async ({ request }) => {
      try {
        const getAPIResponse = await request.post(flightNotesUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightNotesData,
        });

        expect(getAPIResponse.ok()).toBeTruthy();
        expect(getAPIResponse.status()).toBe(200);
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
        const getAPIResponse = await request.get(`${flightNotesUrl}/invalidId`);

        expect(getAPIResponse.status()).toBe(405);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });

    test("Bad Request: Should return status code 400", async ({ request }) => {
      try {
        const postAPIResponse = await request.post(flightNotesUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          data: flightNotesInvalidData,
        });

        expect(postAPIResponse.status()).toBe(400);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
