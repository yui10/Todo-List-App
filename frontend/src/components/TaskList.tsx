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
    UpdateTask: (task: Task) => void;
    DeleteTasks: (task: Task[]) => void;
}

type Order = 'asc' | 'desc';
type OrderByType = 'getCreatedAt' | 'getDueDate';

function Comparator(order: Order, orderBy: OrderByType): (a: Task, b: Task) => number {
    return (a: Task, b: Task) => {
        const val = (A: Task, B: Task) => {
            switch (orderBy) {
                case 'getCreatedAt':
                    return [A.getCreatedAt(), B.getCreatedAt()];
                case 'getDueDate':
                    return [A.getDueDateDayjs(), B.getDueDateDayjs()];
                default:
                    return [A.getCreatedAt(), B.getCreatedAt()];
            }
        }

        let [A, B] = val(a, b);
        if (A === null) A = dayjs('9999-12-31');
        if (B === null) B = dayjs('9999-12-31');

        if (A.isAfter(B)) return order === 'asc' ? 1 : -1;
        if (A.isBefore(B)) return order === 'asc' ? -1 : 1;
        return 0;

    }
}

function TaskList(props: Props) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<OrderByType>('getCreatedAt');
    const { tasks, setEditTask, setEnableEdit, setIsOpenModal, UpdateTask, DeleteTasks } = props;
    const createSortHandler = (property: OrderByType) => () => {
        setOrder(order === "asc" ? "desc" : "asc");
        setOrderBy(property);
    };

    return (
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
                        tasks.sort(Comparator(order, orderBy)).map((task,) => (
                            <React.Fragment key={task.getId()}>
                                <TaskItem task={task} setEditTask={setEditTask}
                                    setEnableEdit={setEnableEdit} setIsOpenModal={setIsOpenModal}
                                    UpdateTask={UpdateTask} DeleteTasks={DeleteTasks} />
                            </React.Fragment>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskList
