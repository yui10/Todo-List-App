import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TodoList from './components/TaskList';
import DeleteTask from './components/DeleteTask';
import TaskHook from './hooks/TaskHook';

function App() {
  const { taskList, setTaskList, CreateTask } = TaskHook();
  return (
    <div className="App" id='root'>
      <h1>TODO LIST</h1>
      <AddTask tasks={taskList} CreateTask={CreateTask} />
      <DeleteTask tasks={taskList} setTasks={setTaskList} />
      <p>残りTodo件数 : {taskList.length}件</p>
      <TodoList tasks={taskList} setTasks={setTaskList} />
    </div>
  );
}

export default App;
