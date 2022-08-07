import { describe, it } from 'vitest';
import { todosData } from '../../api/getTodos';
import { TodosTable } from '../TodoTable';
import { render, screen } from '@testing-library/react';

describe('TodoTable', () => {
  it('should render', async () => {
    render(<TodosTable todos={todosData}></TodosTable>);

    expect(screen.getByText('やること')).toBeInTheDocument();
    expect(screen.getByText('作成日')).toBeInTheDocument();

    expect(screen.getByText('牛乳を買う')).toBeInTheDocument();
    expect(screen.getByText('2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('美容院に行く')).toBeInTheDocument();
    expect(screen.getByText('2022-01-15')).toBeInTheDocument();
    expect(screen.getByText('数学ガールを1章読む')).toBeInTheDocument();
    expect(screen.getByText('2022-01-16')).toBeInTheDocument();

    expect(await screen.findAllByRole('checkbox')).toHaveLength(3);
    expect(await screen.findAllByTestId('DeleteIcon')).toHaveLength(3);
  });
});
