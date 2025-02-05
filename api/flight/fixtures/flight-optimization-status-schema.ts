export const flightOptimizationStatusSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      requestId: {
        type: "string",
      },
      flightId: {
        type: "string",
      },
      flightNumber: {
        type: "integer",
      },
      departureDate: {
        type: "string",
      },
      scheduledBy: {
        type: "string",
      },
      scheduledOn: {
        type: "string",
      },
      sendRequest: {
        type: "string",
      },
      status: {
        type: "string",
      },
      startDateTime: {
        type: ["string", "null"],
      },
      completedDateTime: {
        type: ["string", "null"],
      },
    },
    required: [
      "requestId",
      "flightId",
      "flightNumber",
      "departureDate",
      "scheduledBy",
      "scheduledOn",
      "sendRequest",
      "status",
      "startDateTime",
      "completedDateTime",
    ],
  },
};
