import { todosData } from '../../api/getTodos';
import { TodosTable } from '../TodoTable';
import { render, screen } from '@testing-library/react';

describe('TodoTable', () => {
  it('should render', () => {
    render(<TodosTable todos={todosData}></TodosTable>);

    expect(screen.getByText('やること'));
  });
});
