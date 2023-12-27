import React from 'react'
import Task from '../common/Task';

type Props = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    DeleteTask: (task: Task) => void;
}

const TaskDelete = (props: Props) => {
    const handleDelete = () => {
        props.tasks.forEach((task) => {
            if (task.isCompleted())
                props.DeleteTask(task);
        });
    }

    return (
        <>
            <button onClick={handleDelete}>削除</button>
        </>
    )
}

export default TaskDelete