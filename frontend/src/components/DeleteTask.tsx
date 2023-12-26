import React from 'react'
import Task from '../common/Task';

type Props = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

const DeleteTask = (props: Props) => {
    const handleDelete = () => {
        const newTasks = props.tasks.filter((task) => {
            return !task.isCompleted();
        });
        props.setTasks(newTasks)
    }

    return (
        <>
            <button onClick={handleDelete}>削除</button>
        </>
    )
}

export default DeleteTask