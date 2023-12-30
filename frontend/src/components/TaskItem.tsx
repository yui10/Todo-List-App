import React from 'react'
import {
    Button,
    TableRow,
    TableCell
} from '@mui/material';
import {
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
    return (
        <>
            <TableRow key={props.task.getId()}>
                <TableCell ><input type='checkbox' id={props.task.getId()} checked={props.task.isCompleted()} onChange={handleComplete} readOnly /></TableCell >
                <TableCell ><label htmlFor={props.task.getId()}>{props.task.getContent()}</label></TableCell >
                <TableCell >{props.task.getDueDateLocale()}</TableCell >
                <TableCell >{props.task.getCreatedAt().format(Task.TimeFormatSeconds)}</TableCell >
                <TableCell ><Button variant="contained" onClick={handleUpdate} endIcon={<EditIcon />}>編集</Button></TableCell >
            </TableRow>
        </>
    )
}

export default TaskItem