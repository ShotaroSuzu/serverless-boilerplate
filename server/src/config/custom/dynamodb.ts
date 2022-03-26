export const dynamodb = {
  stages: ["dev"],
  start: {
    port: 8000,
    heapInitial: "200m",
    heapMax: "1g",
    inMemory: true,
    migrate: true,
    seed: true,
    convertEmptyValues: true,
  },
  seed: {
    dev: {
      sources: [{ table: "Todo", sources: ["./__seeds__/Todo.json"] }],
    },
  },
};
