import React from 'react'
import Task from '../common/Task';

type Props = {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

const TaskItem = (props: Props) => {
    const handleComplete = () => {
        const newTasks = props.tasks.map((task) => {
            if (task.getId() === props.task.getId()) {
                return new Task(task.getId(), task.getContent(), task.getDueDate(), !task.isCompleted());
            }
            return task
        });
        props.setTasks(newTasks);
    };
    return (
        <>
            <div className='task'>
                <input type='checkbox' id={props.task.getId()} checked={props.task.isCompleted()} onChange={handleComplete} readOnly />
                <label htmlFor={props.task.getId()}>Todo{props.task.getId()} : {props.task.getContent()}</label>
            </div>
        </>
    )
}

export default TaskItem