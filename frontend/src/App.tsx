import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TodoList from './components/TaskList';
import DeleteTask from './components/DeleteTask';
import TaskHook from './hooks/TaskHook';
import Task from './common/Task';

function App() {
  const { CreateTask } = TaskHook();
  const [task, setTasks] = React.useState<Task[]>([]);
  return (
    <div className="App" id='root'>
      <h1>TODO LIST</h1>
      <AddTask tasks={task} setTasks={setTasks} CreateTask={CreateTask} />
      <DeleteTask tasks={task} setTasks={setTasks} />
      <p>残りTodo件数 : {task.length}件</p>
      <TodoList tasks={task} setTasks={setTasks} />
    </div>
  );
}

export default App;
