import React from 'react'
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper
} from '@mui/material';
import TaskItem from './TaskItem';
import Task from '../common/Task';

type Props = {
  tasks: Task[];
  setEditTask: (task: Task) => void;
  setEnableEdit: (enableEdit: boolean) => void;
  setIsOpenModal: (isOpenModal: boolean) => void;
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
  DeleteTask: (task: Task[]) => void;
}

type Order = 'asc' | 'desc';
type OrderByType = 'getCreatedAt' | 'getDueDate';

function Comparator(order: Order, orderBy: OrderByType): (a: Task, b: Task) => number {
  return (a: Task, b: Task) => {
    const val = (a: Task, b: Task) => {
      switch (orderBy) {
        case 'getCreatedAt':
          return [a.getCreatedAt(), b.getCreatedAt()];
        case 'getDueDate':
          return [a.getDueDateDayjs(), b.getDueDateDayjs()];
        default:
          return [a.getCreatedAt(), b.getCreatedAt()];
      }
    }

    let [A, B] = val(a, b);
    if (A === null) A = dayjs('9999-12-31');
    if (B === null) B = dayjs('9999-12-31');

    if (A.isAfter(B)) {
      return order === 'asc' ? 1 : -1;
    } else if (A.isBefore(B)) {
      return order === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  }
}

const TodoList = (props: Props) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<OrderByType>('getCreatedAt');
  const createSortHandler = (property: OrderByType) => (event: React.MouseEvent<unknown>) => {
    setOrder(order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Todo</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>
                <TableSortLabel active direction={orderBy === "getDueDate" ? order : 'desc'} onClick={createSortHandler("getDueDate")}>
                  期限
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active direction={orderBy === "getCreatedAt" ? order : 'desc'} onClick={createSortHandler("getCreatedAt")}>
                  作成日時
                </TableSortLabel>
              </TableCell>
              <TableCell>編集</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.tasks.sort(Comparator(order, orderBy)).map((task, index) => (
                <TaskItem key={index} task={task} tasks={props.tasks} setEditTask={props.setEditTask}
                  setEnableEdit={props.setEnableEdit} setIsOpenModal={props.setIsOpenModal}
                  setTasks={props.setTasks} updateTask={props.updateTask} DeleteTask={props.DeleteTask}/>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TodoList