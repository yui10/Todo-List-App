import React from 'react'
import {
    Button
} from '@mui/material';
import {
    Delete as DeleteIcon
} from '@mui/icons-material';
import Task from '../common/Task';

type Props = {
    tasks: Task[];
    DeleteTasks: (task: Task[]) => void;
}

function TaskDelete(props: Props) {
    const { tasks, DeleteTasks } = props;
    const handleDelete = () => {
        const deleteTask = tasks.filter((task) => task.isCompleted());
        DeleteTasks(deleteTask);
    }

    return (
        <div>
            <Button variant="contained" onClick={handleDelete} endIcon={<DeleteIcon />}>まとめて削除</Button>
        </div>
    )
}

export default TaskDelete
