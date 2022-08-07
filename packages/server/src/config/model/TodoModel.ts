import type { FromSchema } from "json-schema-to-ts";

export const TodoModel = {
  name: "TodoModel",
  description: "Todoを表現するモデル",
  schema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "TodoのID",
      },
      title: {
        type: "string",
        description: "Todoのタイトル(内容)",
      },
      completed: {
        type: "boolean",
        description: "Todoが完了したかどうか",
      },
      createdAt: {
        type: "string",
        description:
          "Todoがいつできたか。ISO 8601 の日付と時刻の組み合わせ表現",
      },
      updatedAt: {
        type: "string",
        description:
          "Todoがいつできたか。ISO 8601 の日付と時刻の組み合わせ表現",
      },
    },
    required: ["id", "title", "completed", "createdAt", "updatedAt"],
    additionalProperties: false,
  },
} as const;

export type Todo = FromSchema<typeof TodoModel.schema>;
