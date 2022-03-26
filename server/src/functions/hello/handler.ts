import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { doc } from "@libs/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const param = new GetCommand({
    TableName: "Todo",
    Key: {
      code: event.path.slice(1),
    },
  });
  const { Item } = await doc.send(param);
  return formatJSONResponse({
    todo: Item,
    event,
  });
};

export const main = middyfy(hello);
