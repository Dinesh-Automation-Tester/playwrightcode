import Ajv from "ajv";
import {expect, test} from "@playwright/test";
import {flightUrl, flightsUrl} from "../../utils/flight-url";
import {flightServicesSchema} from "../../fixtures/flight-services-schema";

test.describe("GET API Request : Test the endpoint that retrieves the flight services", () => {
    let url: string;

    test.beforeAll("GET - Flight ID", async ({request}) => {
        const getAPIResponse = await request.get(flightsUrl);
        const getAPIResponseBody = await getAPIResponse.json();

        if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
            const flightId = getAPIResponseBody[0]?.flightId;
            const encodedId = encodeURIComponent(flightId);
            url = `${flightUrl}/${encodedId}/services`;
        }
    });

    test.describe("Positive Tests", () => {
        test("Should return status code 200", async ({request}) => {
            try {
                const getAPIResponse = await request.get(url);
                expect(getAPIResponse.ok()).toBeTruthy();
                expect(getAPIResponse.status()).toBe(200);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });

        test("Should match the response schema", async ({request}) => {
            const ajv = new Ajv();
            try {
                const getAPIResponse = await request.get(url);
                const getAPIResponseBody = await getAPIResponse.json();
                //console.log(getAPIResponseBody);

                const validate = ajv.compile(flightServicesSchema);
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
        test("Not Found: Should return status code 404", async ({
                                                                    request,
                                                                }) => {
            try {
                await request.get(`${flightUrl}/invalidId/services`);
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
                    data: {flightServicesSchema},
                });

                expect(getAPIResponse.status()).toBe(405);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });
    });
});
