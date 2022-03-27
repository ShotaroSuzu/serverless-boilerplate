import type { FromSchema } from "json-schema-to-ts";
export const NotFoundErrorResponseModel = {
  name: "NotFoundErrorResponseModel",
  description: "Response data of 404 not found error",
  contentType: "application/json",
  schema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Summary of the error",
      },
    },
    required: ["message"],
    additionalProperties: false,
  },
} as const;

export type NotFoundErrorResponse = FromSchema<
  typeof NotFoundErrorResponseModel
>;
