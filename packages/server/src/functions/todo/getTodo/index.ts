import { NotFoundErrorResponseModel } from "@config/model/error/NotFoundErrorResponseModel";
import { TodoResponseModel } from "@config/model/TodoResponseModel";
import { AWSHttpFunctions } from "@libs/api-gateway";
import { handlerPath } from "@libs/handler-resolver";

export const getTodo: AWSHttpFunctions = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "todos/{id}",
        documentation: {
          description: "Get a todo",
          pathParams: [{ name: "id", description: "The id of the todo" }],
          methodResponses: [
            {
              statusCode: "200",
              responseModels: {
                "application/json": TodoResponseModel.name,
              },
            },
            {
              statusCode: "404",
              responseModels: {
                "application/json": NotFoundErrorResponseModel.name,
              },
            },
          ],
        },
      },
    },
  ],
};
