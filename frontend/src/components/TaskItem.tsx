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
                return new Task(task.getId(), task.getCreatedAt(), task.getContent(), task.getDueDate(), !task.isCompleted());
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
            <tr>
                <td><input type='checkbox' id={props.task.getId()} checked={props.task.isCompleted()} onChange={handleComplete} readOnly /></td>
                <td><label htmlFor={props.task.getId()}>{props.task.getContent()}</label></td>
                <td>{props.task.getDueDate()}</td>
                <td><button onClick={handleUpdate}>編集</button></td>
            </tr>
        </>
    )
}

export default TaskItem