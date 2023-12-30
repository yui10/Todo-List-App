import React from 'react'
import {
    Button,
    Stack,
    TableRow,
    TableCell
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import Task from '../common/Task';

type Props = {
    task: Task;
    tasks: Task[];
    setEditTask: (task: Task) => void;
    setEnableEdit: (enableEdit: boolean) => void;
    setIsOpenModal: (isOpenModal: boolean) => void;
    setTasks: (tasks: Task[]) => void;
    updateTask: (task: Task) => void;
    DeleteTask: (task: Task) => void;
}

const TaskItem = (props: Props) => {
    const handleComplete = () => {
        const newTask = new Task(props.task.getId(), props.task.getCreatedAt(), props.task.getContent(), props.task.getDueDate(), !props.task.isCompleted());
        props.updateTask(newTask);
    };

    const handleUpdate = () => {
        props.setEditTask(props.task);
        props.setEnableEdit(true);
        props.setIsOpenModal(true);
    }

    const handleDelete = () => {
        props.DeleteTask(props.task);
    }

    return (
        <>
            <TableRow key={props.task.getId()}>
                <TableCell ><input type='checkbox' id={props.task.getId()} checked={props.task.isCompleted()} onChange={handleComplete} readOnly /></TableCell >
                <TableCell ><label htmlFor={props.task.getId()}>{props.task.getContent()}</label></TableCell >
                <TableCell >{props.task.getDueDateDayjs()?.format(Task.TimeFormat)}</TableCell >
                <TableCell >{props.task.getCreatedAt().format(Task.TimeFormatSeconds)}</TableCell >
                <TableCell >
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleUpdate} endIcon={<EditIcon />}>編集</Button>
                        <Button variant="contained" onClick={handleDelete} endIcon={<DeleteIcon />}>削除</Button>
                    </Stack>
                </TableCell >
            </TableRow>
        </>
    )
}

export default TaskItem