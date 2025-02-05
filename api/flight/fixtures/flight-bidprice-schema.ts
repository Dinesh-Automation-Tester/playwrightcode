export const flightBidPriceSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      legId: {
        type: "string",
      },
      leg: {
        type: "string",
      },
      cabins: {
        type: "array",
        items: {
          type: "object",
          properties: {
            cabin: {
              type: "string",
            },
            bidPriceVector: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  seatAvailIndex: {
                    type: "integer",
                  },
                  bidPrice: {
                    type: "number",
                  },
                },
                required: ["seatAvailIndex", "bidPrice"],
              },
            },
          },
          required: ["cabin", "bidPriceVector"],
        },
      },
    },
    required: ["legId", "leg", "cabins"],
  },
};
