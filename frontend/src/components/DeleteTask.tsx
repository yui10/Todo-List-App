import React from 'react'

type Props = {
    tasks: {
        id: number;
        text: string;
        completed: boolean;
    }[];
    setTasks: (tasks: {
        id: number;
        text: string;
        completed: boolean;
    }[]) => void;
}

type Tasks = {
    id: number;
    text: string;
    completed: boolean;
}[]

const DeleteTask = (props: Props) => {
    const handleDelete = () => {
        const newTasks = props.tasks.filter((task) => {
            return !task.completed;
        });
        let count = 1;
        newTasks.forEach((task) => {
            task.id = count++;
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