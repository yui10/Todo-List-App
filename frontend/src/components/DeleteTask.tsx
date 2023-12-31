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
    setTasks: (tasks: Task[]) => void;
    DeleteTask: (task: Task[]) => void;
}

const TaskDelete = (props: Props) => {
    const handleDelete = () => {
        let delete_task: Task[] = [];
        props.tasks.map((task) => {
            if (task.isCompleted())
                delete_task.push(task);
        });
        props.DeleteTask(delete_task);
    }

    return (
        <div>
            <Button variant="contained" onClick={handleDelete} endIcon={<DeleteIcon />}>まとめて削除</Button>
        </div>
    )
}

export default TaskDelete