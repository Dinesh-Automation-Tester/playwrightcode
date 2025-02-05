export const flightServicesSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            flightId: {type: "string"},
            flightNumber: {type: "integer"},
            departureDate: {type: "string"},
            departureTime: {type: "string"},
            departureTimeUTC: {type: "string"},
            arrivalTimeUTC: {type: "string"},
            serviceId: {type: "string"},
            legTag: {type: "string"},
            legOrder: {type: "integer"},
            countOfMultiLegs: {type: "integer"},
            origin: {type: "string"},
            destination: {type: "string"},
            cabin: {type: "string"},
            cabinIndex: {type: "integer"},
            flowType: {type: "string"},
            tps: {type: "string"},
            bookingsTotal: {type: "integer"},
            currentRevenue: {type: "number"},
            currentAvgFare: {type: "number"},
            netBookingsExpected: {type: "integer"},
            netRevenueExpected: {type: "number"},
            expectedAvgFare: {type: "number"},
            poc: {type: "string"},
            baseDemand: {type: ["string", "null"]},
            optimalPrice: {type: "number"},
            marginalRevenue: {type: "number"},
            displacementCost: {type: "number"},
            demandAtCurrentFare: {type: "integer"},
            demandAtMarginalRevenue: {type: "integer"},
            expectedCancellations: {type: "integer"},
            expectedCancellationsRevenue: {type: "number"},
            associatedLegCabins: {
                oneOf: [
                    { type: "array", items: { type: "string" } },
                    { type: "null" }
                ]
            },
            associatedSegmentCabins: {
                oneOf: [
                    { type: "array", items: { type: "string" } },
                    { type: "null" }
                ]
            },
            elapsedTime: {type: "integer"},
            serviceBookings: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        bookingChannel: {type: "string"},
                        currentBookings: {type: "integer"},
                        totalBookingsRevenue: {type: "number"},
                        currentRevenue: {type: "number"},
                        currentAvgFare: {type: "number"}
                    },
                    required: ["bookingChannel", "currentBookings", "totalBookingsRevenue", "currentRevenue", "currentAvgFare"]
                }
            }
        },
        required: [
            "flightId", "flightNumber", "departureDate", "departureTime", "departureTimeUTC",
            "arrivalTimeUTC", "serviceId", "legTag", "legOrder", "countOfMultiLegs", "origin",
            "destination", "cabin", "cabinIndex", "flowType", "tps", "bookingsTotal", "currentRevenue",
            "currentAvgFare", "netBookingsExpected", "netRevenueExpected", "expectedAvgFare", "poc",
            "baseDemand", "optimalPrice", "marginalRevenue", "displacementCost", "demandAtCurrentFare",
            "demandAtMarginalRevenue", "expectedCancellations", "expectedCancellationsRevenue",
            "associatedLegCabins", "associatedSegmentCabins", "elapsedTime", "serviceBookings"
        ]
    }
};
