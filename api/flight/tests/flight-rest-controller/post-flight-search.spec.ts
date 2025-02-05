import Ajv from "ajv";
import {expect, test} from "@playwright/test";
import {flightsSchema} from "../../fixtures/flights-schema";
import {flightSearchUrl, flightsUrl} from "../../utils/flight-url";
import {flightSearchInValidData} from "../../fixtures/flight-search-data";

test.describe("POST API Request : Test the endpoint that search a flight", () => {

    let flightSearchData: any;

    test.beforeAll('GET - Flight Search Data', async ({request}) => {
        const getAPIResponse = await request.get(flightsUrl);
        const getAPIResponseBody = await getAPIResponse.json();

        if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
            flightSearchData = {
                flightIds: [
                    `${getAPIResponseBody[0]?.flightId}`
                ],
            }
        }
    });

    test.describe("Positive Tests", () => {
        test("Should return status code 200", async ({request}) => {
            try {
                const postAPIResponse = await request.post(flightSearchUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightSearchData,
                });
                expect(postAPIResponse.ok()).toBeTruthy();
                expect(postAPIResponse.status()).toBe(200);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });

        test("Should match the response schema", async ({request}) => {
            const ajv = new Ajv();

            try {
                const postAPIResponse = await request.post(flightSearchUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightSearchData,
                });
                const getAPIResponseBody = await postAPIResponse.json();

                const validate = ajv.compile(flightsSchema);
                const valid = validate(getAPIResponseBody);

                if (!valid) {
                    console.error("Schema validation error", validate.errors);
                }

            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });
    });

    test.describe("Negative Tests", () => {
        test("Invalid HTTP Method: Should return status code 405", async ({request}) => {
            try {
                const getAPIResponse = await request.get(flightSearchUrl);

                expect(getAPIResponse.status()).toBe(405);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });

        test("Bad Request: Should return status code 400", async ({request}) => {
            try {
                const postAPIResponse = await request.post(flightSearchUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightSearchInValidData,
                });

                expect(postAPIResponse.status()).toBe(400);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });
    });

});
