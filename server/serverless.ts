import type { AWS } from "@serverless/typescript";
import { Resources, custom } from "@config/index";
import * as functions from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "server",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom,
  // custom: {
  //   esbuild: {
  //     bundle: true,
  //     minify: false,
  //     sourcemap: true,
  //     exclude: ["aws-sdk"],
  //     target: "node14",
  //     define: { "require.resolve": undefined },
  //     platform: "node",
  //     concurrency: 10,
  //   },
  //   dynamodb: {
  //     stages: ["dev"],
  //     start: {
  //       port: 8000,
  //       heapInitial: "200m",
  //       heapMax: "1g",
  //       inMemory: true,
  //       migrate: true,
  //       seed: true,
  //       convertEmptyValues: true,
  //     },
  //     seed: {
  //       dev: {
  //         sources: [
  //           { table: "greeting", sources: ["./seeds/devGreeting.json"] },
  //         ],
  //       },
  //     },
  //   },
  // },
  resources: {
    Resources,
    // Resources: {
    //   greetingTable: {
    //     Type: "AWS::DynamoDB::Table",
    //     Properties: {
    //       TableName: "greeting",
    //       AttributeDefinitions: [
    //         {
    //           AttributeName: "code",
    //           AttributeType: "S",
    //         },
    //       ],
    //       KeySchema: [
    //         {
    //           AttributeName: "code",
    //           KeyType: "HASH",
    //         },
    //       ],
    //       ProvisionedThroughput: {
    //         ReadCapacityUnits: 1,
    //         WriteCapacityUnits: 1,
    //       },
    //     },
    //   },
    // },
  },
};

module.exports = serverlessConfiguration;
