export const flightNotesSchema = {
  type: "object",
  properties: {
    flightId: {
      type: "string",
    },
    flightNumber: {
      type: "integer",
    },
    legId: {
      type: "string",
    },
    notes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          noteId: {
            type: "string",
          },
          userName: {
            type: "string",
          },
          userFullName: {
            type: "string",
          },
          note: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: ["string", "null"],
          },
        },
        required: [
          "noteId",
          "userName",
          "userFullName",
          "note",
          "createdAt",
          "updatedAt",
        ],
      },
    },
  },
  required: ["flightId", "flightNumber", "legId", "notes"],
};
