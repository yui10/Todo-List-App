import React from 'react'
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
        const newTasks = props.tasks.map((task) => {
            if (task.getId() === props.task.getId()) {
                return new Task(task.getId(), task.getContent(), task.getDueDate(), !task.isCompleted());
            }
            return task
        });
        props.setTasks(newTasks);
    };

    const handleUpdate = () => {
        props.setEditTask(props.task);
        props.setEnableEdit(true);
        props.setIsOpenModal(true);
    }
    return (
        <>
            <div className='task'>
                <input type='checkbox' id={props.task.getId()} checked={props.task.isCompleted()} onChange={handleComplete} readOnly />
                <label htmlFor={props.task.getId()}>Todo{props.task.getId()} : {props.task.getContent()}</label>
                <button onClick={handleUpdate}>編集</button>
            </div>
        </>
    )
}

export default TaskItem