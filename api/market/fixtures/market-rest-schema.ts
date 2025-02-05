export const marketSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      carrier: {
        type: "string",
      },
      market: {
        type: "string",
      },
      entity: {
        type: "string",
      },
      departureDate: {
        type: "string",
      },
      numberOfItineraries: {
        type: "integer",
      },
    },
    required: [
      "carrier",
      "market",
      "entity",
      "departureDate",
      "numberOfItineraries",
    ],
    additionalProperties: false,
  },
};
