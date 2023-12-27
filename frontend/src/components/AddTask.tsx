import React from 'react';
import Modal from "react-modal";
import dayjs from 'dayjs';
import Task from '../common/Task';

type Props = {
    tasks: Task;
    EnableEdit: boolean;
    isOpenModal: boolean;
    setEditTask: (task: Task) => void;
    setEnableEdit: (enableEdit: boolean) => void;
    setIsOpenModal: (isOpenModal: boolean) => void;
    CreateTask: (task: Task) => void;
    UpdateTask: (task: Task) => void;
}


Modal.setAppElement("#root");

const AddTask = (props: Props) => {
    const taskText = React.useRef<HTMLInputElement>(null);
    const dueDate = React.useRef<HTMLInputElement>(null);

    const addTask = () => {
        if (taskText.current === null) return;
        if (taskText.current.value === '') return;
        const day = dayjs(dueDate.current?.value);
        let id = props.tasks.getId() ?? '0';
        let task = new Task(id, dayjs(), taskText.current.value, day.format("YYYY-MM-DDThh:mmZ"), false);
        if (props.EnableEdit)
            props.UpdateTask(task);
        else
            props.CreateTask(task);
        taskText.current.value = '';
        closeModal();
    };

    function openModal() {
        props.setIsOpenModal(true);
    };

    function closeModal() {
        props.setEditTask(new Task("", dayjs(), "", "", false));
        props.setEnableEdit(false);
        props.setIsOpenModal(false);
    };

    return (
        <div>
            <button onClick={openModal}>Add Task</button>
            <Modal isOpen={props.isOpenModal}
                onAfterOpen={openModal}
                onAfterClose={closeModal}
                onRequestClose={closeModal}
            >
                <p>タスク名</p>
                <input className='inputTask' type="text" ref={taskText} defaultValue={props.tasks.getContent()} />
                <p>期限</p>
                <input type="datetime-local" id="DueDateTime"
                    min="2000-01-01T00:00" max="2099-12-31T23:59" ref={dueDate}
                    defaultValue={props.tasks.getDueDate()} />
                <br />
                {props.EnableEdit ?
                    <button onClick={addTask}>Update Task</button> :
                    <button onClick={addTask}>Add Task</button>
                }
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div >
    );
};

export default AddTask;