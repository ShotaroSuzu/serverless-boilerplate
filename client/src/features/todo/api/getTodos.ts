import { Todo } from '../types';

const todosData: Todo[] = [
  {
    id: '1',
    title: '牛乳を買う',
    addedDate: '2022-01-01',
    editedDate: '2022-01-01',
  },
  {
    id: '2',
    title: '美容院に行く',
    addedDate: '2022-01-15',
    editedDate: '2022-01-15',
    doneDate: '2022-01-18',
    done: true,
  },
  {
    id: '3',
    title: '数学ガールを1章読む',
    addedDate: '2022-01-16',
    editedDate: '2022-01-16',
  },
];

export const getTodos = (): Todo[] => {
  return todosData;
};
