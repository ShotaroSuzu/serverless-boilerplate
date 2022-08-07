import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = "ap-northeast-1";

const dbOption = (): DynamoDBClientConfig => {
  if (process.env.IS_OFFLINE) {
    return {
      region: "localhost",
      endpoint: "http://localhost:8000",
    };
  }
  return { region: REGION };
};

// connect to local DB if running offline
export const db = new DynamoDBClient(dbOption());
export const doc = DynamoDBDocumentClient.from(db);
