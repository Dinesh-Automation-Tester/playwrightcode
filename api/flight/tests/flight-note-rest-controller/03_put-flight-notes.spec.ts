import { expect, test } from "@playwright/test";

import { flightNotesInvalidData } from "../../fixtures/flight-notes-data";
import { flightNotesUrl, flightsUrl } from "../../utils/flight-url";

test.describe("PUT API Request : Test the endpoint that update flight note", () => {
  let url: string;
  let noteId: string;
  let flightNoteData: any;

  test.beforeAll("GET - Note Id for updating note", async ({ request }) => {
    let flightId: string;
    let legId: string;

    const getAPIResponse = await request.get(flightsUrl);
    const getAPIResponseBody = await getAPIResponse.json();

    if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
      flightId = getAPIResponseBody[0]?.flightId;
      legId = getAPIResponseBody[0]?.legId;
      const encodedFlightId = encodeURIComponent(flightId);
      const encodedLegId = encodeURIComponent(legId);
      url = `${flightNotesUrl}s?flightId=${encodedFlightId}&legId=${encodedLegId}`;
    }

    const getNoteResponse = await request.get(url);
    const getNoteResponseBody = await getNoteResponse.json();
    noteId = getNoteResponseBody?.notes[0]?.noteId;

    flightNoteData = {
      flightId: flightId,
      legId: legId,
      noteId: noteId,
      note: "Note updated",
    };
  });

  test.describe("Positive Tests", () => {
    test("Should return status code 200", async ({ request }) => {
      console.log("noteId", noteId);
      try {
        const putAPIResponse = await request.put(
          `${flightNotesUrl}/${noteId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: flightNoteData,
          }
        );

        expect(putAPIResponse.ok()).toBeTruthy();
        expect(putAPIResponse.status()).toBe(200);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });

  test.describe("Negative Tests", () => {
    test("Bad Request: Should return status code 400", async ({ request }) => {
      try {
        const putAPIResponse = await request.put(
          `${flightNotesUrl}/${noteId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: flightNotesInvalidData,
          }
        );

        expect(putAPIResponse.status()).toBe(400);
      } catch (error) {
        console.error("API request or validation failed!", error);
        throw error;
      }
    });
  });
});
