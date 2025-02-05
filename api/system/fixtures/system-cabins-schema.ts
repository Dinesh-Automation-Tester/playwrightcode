export const systemCabinsSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
      index: {
        type: "integer",
      },
    },
    required: ["code", "index"],
    additionalProperties: false,
  },
};
