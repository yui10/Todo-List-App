import React from 'react'

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
}

type Tasks = {
    id: number
    text: string
    completed: boolean
}[];

const AddTask = (props: Props) => {
    const taskText = React.useRef<HTMLInputElement>(null);
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
        taskText.current.value = '';
    };
    return (
        <div>
            <input className='inputTask' type="text" ref={taskText} />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default AddTask;