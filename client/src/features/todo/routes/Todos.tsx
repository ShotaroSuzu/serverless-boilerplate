import { getTodos } from '../api/getTodos';
import { TodosTable } from '../components/TodoTable';

export const Todos = () => {
  const todos = getTodos();

  return <TodosTable todos={todos} />;
};
