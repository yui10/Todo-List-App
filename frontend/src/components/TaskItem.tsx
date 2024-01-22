import React from 'react';
import { Button, Stack, TableRow, TableCell } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Task from '../common/Task';

type Props = {
    task: Task;
    setEditTask: (task: Task) => void;
    setEnableEdit: (enableEdit: boolean) => void;
    setIsOpenModal: (isOpenModal: boolean) => void;
    UpdateTask: (task: Task) => void;
    DeleteTasks: (task: Task[]) => void;
};

function TaskItem(props: Props) {
    const { task, setEditTask, setEnableEdit, setIsOpenModal, UpdateTask, DeleteTasks } = props;
    const handleComplete = () => {
        const newTask = new Task(
            task.getId(),
            task.getCreatedAt(),
            task.getContent(),
            task.getDueDate(),
            !task.isCompleted()
        );
        UpdateTask(newTask);
    };

    const handleUpdate = () => {
        setEditTask(task);
        setEnableEdit(true);
        setIsOpenModal(true);
    };

    const handleDelete = () => {
        DeleteTasks([task]);
    };

    return (
        <TableRow>
            <TableCell>
                <input
                    type="checkbox"
                    id={task.getId()}
                    checked={task.isCompleted()}
                    onChange={handleComplete}
                    readOnly
                />
            </TableCell>
            <TableCell>
                <label htmlFor={task.getId()}>{task.getContent()}</label>
            </TableCell>
            <TableCell>{task.getDueDateDayjs()?.format(Task.TimeFormat)}</TableCell>
            <TableCell>{task.getCreatedAt().format(Task.TimeFormatSeconds)}</TableCell>
            <TableCell>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleUpdate} endIcon={<EditIcon />}>
                        編集
                    </Button>
                    <Button variant="contained" onClick={handleDelete} endIcon={<DeleteIcon />}>
                        削除
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}

export default TaskItem;
