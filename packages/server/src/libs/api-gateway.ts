import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyEventMultiValueQueryStringParameters,
  Handler,
} from "aws-lambda";
import { AWS } from "@serverless/typescript";
import type { FromSchema } from "json-schema-to-ts";

/**
 * 配列型を型変数に入れることで、配列型の中身を型として抽出するヘルパー型
 * - T extends 型A ? 型B : 型C → 条件型 : 型定義における参考演算子のようなもの
 * - T[number] → 配列型に対するインデックスアクセス型: 配列の型を指定する　参考：https://typescriptbook.jp/reference/type-reuse/indexed-access-types#%E9%85%8D%E5%88%97%E5%9E%8B%E3%81%A8%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E5%9E%8B
 * - never → Never 型 : 値を持たない型のこと。参考：https://typescript-jp.gitbook.io/deep-dive/type-system/never
 */
type ElementType<T> = T extends unknown[] ? T[number] : never;

/**
 * AWS 型からHttp関連のfunctionを抜き出す。
 *  - T["functions"] → インデックスアクセス型。 functionsという要素に定義されている型を抜き出す。
 */
export type AWSFunction = Required<Pick<AWS, "functions">>["functions"][""];
type Events = AWSFunction["events"];
type Event = ElementType<Events>;
type Http = Extract<Event, { http: unknown }>["http"];

type Documentation = {
  summary?: string;
  description?: string;
  requestBody?: {
    description?: string;
  };
  requestHeaders?: Array<{ name?: string; description?: string }>;
  queryParams?: Array<{ name?: string; description?: string }>;
  pathParams?: Array<{ name: string; description: string }>;
  methodResponses?: Array<{
    statusCode?: string;
    responseModels?: { [key: string]: string };
  }>;
};

export type AWSHttpFunctions = Omit<AWSFunction, "events"> & {
  events?: Array<{
    http: Http & {
      documentation?: Documentation;
    };
  }>;
};

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export type NormalAPIGatewayProxyEvent = Handler<
  Omit<
    APIGatewayProxyEvent,
    | "pathParameters"
    | "queryStringParameters"
    | "multiValueQueryStringParameters"
  > & {
    pathParameters: { [name: string]: string };
    queryStringParameters: APIGatewayProxyEventQueryStringParameters;
    multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters;
  },
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode = 200
) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
