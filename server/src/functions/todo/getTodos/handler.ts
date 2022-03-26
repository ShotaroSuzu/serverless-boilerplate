import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { doc } from "@libs/db";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import schema from "./schema";

const getTodos: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const command = new ScanCommand({ TableName: "Todo" } as ScanCommandInput);
  const { Items } = await doc.send(command);
  return formatJSONResponse({
    todo: Items,
    event,
  });
};

export const main = middyfy(getTodos);
