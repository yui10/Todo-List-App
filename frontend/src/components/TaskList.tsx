import React from 'react'
import TaskItem from './TaskItem';
import Task from '../common/Task';

type Props = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const TodoList = (props: Props) => {
  return (
    <>
      <div>TodoList</div>
      {
        props.tasks.map((task) => (
          <TaskItem key={task.getDueDate()} task={task} tasks={props.tasks} setTasks={props.setTasks} />
        ))
      }
    </>
  )
}

export default TodoList