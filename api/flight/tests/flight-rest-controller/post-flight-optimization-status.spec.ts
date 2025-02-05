import Ajv from "ajv";
import {expect, test} from "@playwright/test";
import {flightOptimizationStatusUrl, flightsUrl} from "../../utils/flight-url";
import {flightOptimizationStatusSchema} from "../../fixtures/flight-optimization-status-schema";
import {flightOptimizationStatusInvalidData} from "../../fixtures/flight-optimization-status-data";

test.describe("POST API Request : Test the endpoint that creates a flight optimization Status", () => {

    let flightOptimizationStatusData: any;

    test.beforeAll('GET - Flight Optimization Data', async ({request}) => {
        const getAPIResponse = await request.get(flightsUrl);
        const getAPIResponseBody = await getAPIResponse.json();

        if (getAPIResponseBody && getAPIResponseBody?.length > 0) {
            flightOptimizationStatusData = {
                flightIdList: [`${getAPIResponseBody[0]?.flightId}`],
                scheduledOnDayDiff: 0
            }
        }
    });

    test.describe("Positive Tests", () => {
        test("Should return status code 200", async ({request}) => {
            try {
                const postAPIResponse = await request.post(flightOptimizationStatusUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightOptimizationStatusData,
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
                const postAPIResponse = await request.post(flightOptimizationStatusUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightOptimizationStatusData,
                });
                const postAPIResponseBody = await postAPIResponse.json();

                const validate = ajv.compile(flightOptimizationStatusSchema);
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
        test("Invalid HTTP Method: Should return status code 405", async ({request,}) => {
            try {
                const getAPIResponse = await request.get(
                    flightOptimizationStatusUrl
                );

                expect(getAPIResponse.status()).toBe(405);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }
        });

        test("Bad Request: Should return status code 400", async ({request}) => {

            try {
                const postAPIResponse = await request.post(flightOptimizationStatusUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: flightOptimizationStatusInvalidData,
                });

                expect(postAPIResponse.status()).toBe(400);
            } catch (error) {
                console.error("API request or validation failed!", error);
                throw error;
            }

        });
    });
});
