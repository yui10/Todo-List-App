import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TodoList from './components/TaskList';
import DeleteTask from './components/DeleteTask';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [task, setTasks] = React.useState<Task[]>([]);
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <AddTask tasks={task} setTasks={setTasks} />
      <DeleteTask tasks={task} setTasks={setTasks} />
      <p>残りTodo件数 : {task.length}件</p>
      <TodoList tasks={task} setTasks={setTasks} />
    </div>
  );
}

export default App;
