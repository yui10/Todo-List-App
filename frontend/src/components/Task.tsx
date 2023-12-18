import React from 'react'

type Props = {
    task: {
        id: number;
        text: string;
        completed: boolean;
    };
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

const Task = (props: Props) => {
    const handleComplete = () => {
        const newTasks = props.tasks.map((task) => {
            if (task.id === props.task.id) {
                return {
                    ...task,
                    completed: !task.completed
                }
            }
            return task
        });
        props.setTasks(newTasks);
    };
    return (
        <>
            <div className='task'>
                <input type='checkbox' id={String(props.task.id)} checked={props.task.completed} onChange={handleComplete} readOnly />
                <label htmlFor={String(props.task.id)}>Todo{props.task.id} : {props.task.text}</label>
            </div>
        </>
    )
}

export default Task