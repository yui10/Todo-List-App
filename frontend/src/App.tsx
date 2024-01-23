import React from 'react';
import dayjs from 'dayjs';
import {
    CssBaseline,
    Stack
} from '@mui/material';
import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskDelete from './components/DeleteTask';
import TaskHook from './hooks/TaskHook';
import Task from './common/Task';

function App() {
    const { taskList, CreateTask, UpdateTask, DeleteTasks } = TaskHook();
    const [EnableEdit, setEnableEdit] = React.useState(false);
    const [EditTask, setEditTask] = React.useState(new Task("", dayjs(), "", "", false));
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    return (
        <div className="App" id='root'>
            <CssBaseline />
            <Stack spacing={5} >
                <h1>TODO LIST</h1>
                <AddTask tasks={EditTask} setEditTask={setEditTask}
                    EnableEdit={EnableEdit} setEnableEdit={setEnableEdit}
                    isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}
                    CreateTask={CreateTask} UpdateTask={UpdateTask} />
                <TaskDelete tasks={taskList} DeleteTasks={DeleteTasks} />
                <p>残りTodo件数 : {taskList.length}件</p>
                <TaskList tasks={taskList} setEditTask={setEditTask}
                    setEnableEdit={setEnableEdit} setIsOpenModal={setIsOpenModal}
                    UpdateTask={UpdateTask} DeleteTasks={DeleteTasks} />
            </Stack>
        </div>
    );
}

export default App;
