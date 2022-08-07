import { TodoModel } from "./TodoModel";

export const TodoResponseModel = {
  name: "TodoResponseModel",
  description: "Response boody for todos/{id}",
  contentType: "application/json",
  schema: TodoModel.schema,
} as const;
