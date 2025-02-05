export const flightOptSchema = {
  type: "object",
  properties: {
    failed: {
      type: "array",
      items: {
        type: "string",
      },
    },
    succeeded: {
      type: "array",
      items: {
        type: "string",
      },
    },
    additionalProp1: {
      type: "array",
      items: {
        type: "string",
      },
    },
    additionalProp2: {
      type: "array",
      items: {
        type: "string",
      },
    },
    additionalProp3: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["failed", "succeeded"],
  additionalProperties: true,
};
