import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TodoList from './components/TaskList';
import TaskDelete from './components/DeleteTask';
import TaskHook from './hooks/TaskHook';
import Task from './common/Task';

function App() {
  const { taskList, setTaskList, CreateTask, UpdateTask, DeleteTask } = TaskHook();
  const [EnableEdit, setEnableEdit] = React.useState(false);
  const [EditTask, setEditTask] = React.useState(new Task("", "", ""));
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  return (
    <div className="App" id='root'>
      <h1>TODO LIST</h1>
      <AddTask tasks={EditTask} setEditTask={setEditTask}
        EnableEdit={EnableEdit} setEnableEdit={setEnableEdit}
        isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}
        CreateTask={CreateTask} UpdateTask={UpdateTask} />
      <TaskDelete tasks={taskList} setTasks={setTaskList} DeleteTask={DeleteTask} />
      <p>残りTodo件数 : {taskList.length}件</p>
      <TodoList tasks={taskList} setEditTask={setEditTask}
        setEnableEdit={setEnableEdit} setIsOpenModal={setIsOpenModal}
        setTasks={setTaskList} updateTask={UpdateTask} />
    </div>
  );
}

export default App;
