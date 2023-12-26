import React from 'react';
import Modal from "react-modal";
import Task from '../common/Task';

type Props = {
    tasks: Task[];
    setTasks: (task: Task[]) => void;
    CreateTask: (task: Task) => void;
}


Modal.setAppElement("#root");

const AddTask = (props: Props) => {
    const taskText = React.useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const addTask = () => {
        if (taskText.current === null) return;
        if (taskText.current.value === '') return;
        let id = 0;
        if (props.tasks.length === 0) {
            id = 1;
        }
        else {
            id = props.tasks.length + 1;
        }
        let task = new Task(String(id), taskText.current.value, new Date().toString(), false);

        const newTasks: Task[] = [...props.tasks, task];
        props.setTasks(newTasks);
        props.CreateTask(task);
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