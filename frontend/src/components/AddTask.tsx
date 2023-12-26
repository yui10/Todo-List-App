import React from 'react';
import Modal from "react-modal";
import Task from '../common/Task';

type Props = {
    tasks: {
        id: number;
        text: string;
        completed: boolean;
    }[];
    setTasks: (task: {
        id: number;
        text: string;
        completed: boolean;
    }[]) => void;
    CreateTask: (task: Task) => void;
}

type Tasks = {
    id: number
    text: string
    completed: boolean
}[];

Modal.setAppElement("#root");

const AddTask = (props: Props) => {
    const taskText = React.useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const addTask = () => {
        if (taskText.current === null) return;
        if (taskText.current.value === '') return;
        let task = { id: 0, text: taskText.current.value, completed: false };
        if (props.tasks.length === 0) {
            task.id = 1;
        }
        else {
            task.id = props.tasks.length + 1;
        }

        const newTasks: Tasks = [...props.tasks, task];
        props.setTasks(newTasks);
        let newTask = new Task(String(task.id), task.text, new Date().toString(), task.completed);
        props.CreateTask(newTask);
        taskText.current.value = '';
        closeModal();
    };

    function openModal() {
        setIsOpen(true);
    };

    function closeModal() {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Add Task</button>
            <Modal isOpen={isOpen}
                onAfterOpen={openModal}
                onAfterClose={closeModal}
                onRequestClose={closeModal}
            >
                <p>タスク名</p>
                <input className='inputTask' type="text" ref={taskText} />
                <p>期限</p>
                <input type="date" />
                <br />
                <button onClick={addTask}>Add Task</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div >
    );
};

export default AddTask;