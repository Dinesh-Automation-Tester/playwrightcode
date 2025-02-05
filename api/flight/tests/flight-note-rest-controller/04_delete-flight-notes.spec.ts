import { expect, test } from "@playwright/test";

import { flightNotesInvalidData } from "../../fixtures/flight-notes-data";
import { flightNotesUrl, flightsUrl } from "../../utils/flight-url";

test.describe("Delete API Request - Test the endpoint that delete flight note by userId", () => {
  let url: string;
  let noteId: string;
  let flightNoteData: any;

  test.beforeAll("GET - Note Id to delete note", async ({ request }) => {
    let flightID: string;
    let legId: string;

    const getAPIResponse = await request.get(flightsUrl);
    const getAPIResponseBody = await getAPIResponse.json();

    if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
      flightID = getAPIResponseBody[0]?.flightId;
      legId = getAPIResponseBody[0]?.legId;
      const encodedFlightId = encodeURIComponent(flightID);
      const encodedLegId = encodeURIComponent(legId);
      url = `${flightNotesUrl}s?flightId=${encodedFlightId}&legId=${encodedLegId}`;
    }

    const getNoteResponse = await request.get(url);
    const getNoteResponseBody = await getNoteResponse.json();
    noteId = getNoteResponseBody?.notes[0]?.noteId;

    flightNoteData = {
      flightId: flightID,
      legId: legId,
      noteId: noteId,
    };
  });

  test.describe("Positive Tests", () => {
    test("Deleting user should return status code 200", async ({ request }) => {
      try {
        const deleteAPIResponse = await request.delete(
          `${flightNotesUrl}/${noteId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: flightNoteData,
          }
        );

        expect(deleteAPIResponse.ok()).toBeTruthy();
        expect(deleteAPIResponse.status()).toBe(200);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });

  test.describe("Negative Tests", () => {
    test("Deleting user role with invalid data should return status code 400", async ({
      request,
    }) => {
      try {
        const deleteAPIResponse = await request.delete(
          `${flightNotesUrl}/${noteId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: flightNotesInvalidData,
          }
        );

        expect(deleteAPIResponse.ok()).toBeFalsy();
        expect(deleteAPIResponse.status()).toBe(400);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
