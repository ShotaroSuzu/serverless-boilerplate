import type { NormalAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { doc } from "@libs/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { httpError } from "@libs/httpError";

const getTodos: NormalAPIGatewayProxyEvent = async ({
  pathParameters: { id },
}) => {
  const command = new GetCommand({ TableName: "Todo", Key: { id } });
  const { Item } = await doc.send(command);
  if (!Item) {
    throw httpError(404, { message: `Todo: ${id} is not found.` });
  }
  return formatJSONResponse({
    Item,
  });
};

export const main = middyfy(getTodos);
