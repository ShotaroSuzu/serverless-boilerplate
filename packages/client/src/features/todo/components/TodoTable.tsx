import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Todo } from '../types';

export const TodosTable = ({ todos }: { todos: Todo[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>やること</TableCell>
            <TableCell>作成日</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => {
            return (
              <TableRow key={todo.id}>
                <TableCell>
                  <Checkbox checked={todo.done} />
                </TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.addedDate}</TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon titleAccess="削除" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
