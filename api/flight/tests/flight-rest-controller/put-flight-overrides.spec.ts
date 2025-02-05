import {expect, test} from "@playwright/test";
import {flightOverridesUrl, flightsUrl} from "../../utils/flight-url";
import {flightOverridesInvalidData} from "../../fixtures/flight-overrides-data";

test.describe("PUT API Request - Test the endpoint that overrides the flights data.", () => {

    let flightOverridesData: any;

    test.beforeAll('GET - Flight Overrides Data', async ({request}) => {
        const getAPIResponse = await request.get(flightsUrl);
        const getAPIResponseBody = await getAPIResponse.json();

        if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
            flightOverridesData = [{
                flightId: getAPIResponseBody[0]?.flightId,
                leg: getAPIResponseBody[0]?.leg,
                legId: getAPIResponseBody[0]?.legId,
                cabin: getAPIResponseBody[0]?.cabin,
                flightNumber: getAPIResponseBody[0]?.flightNumber,
                showUpRateUser: 10,
                departureDate: getAPIResponseBody[0]?.departureDate,
            }]
        }
    });

    test.describe("Positive Tests", () => {
        test("Update user preference with valid data should return status code 200", async ({
                                                                                                request,
                                                                                            }) => {
            try {
                const putAPIResponse = await request.put(flightOverridesUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightOverridesData,
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
        test("Update user role with invalid data should return status code 400", async ({
                                                                                            request,
                                                                                        }) => {
            try {
                const putAPIResponse = await request.put(flightOverridesUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightOverridesInvalidData,
                });

                expect(putAPIResponse.status()).toBe(400);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });
    });
});
