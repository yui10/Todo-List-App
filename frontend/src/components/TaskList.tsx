import React from 'react'
import TaskItem from './TaskItem';

type Props = {
  tasks: {
    id: number;
    text: string;
    completed: boolean;
  }[];
  setTasks: (tasks: {
    id: number;
    text: string;
    completed: boolean;
  }[]) => void;
}

const TodoList = (props: Props) => {
  return (
    <>
      <div>TodoList</div>
      {
        props.tasks.map((task) => (
          <TaskItem key={task.id} task={task} tasks={props.tasks} setTasks={props.setTasks} />
        ))
      }
    </>
  )
}

export default TodoList