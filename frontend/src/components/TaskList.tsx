import React from 'react'
import TaskItem from './TaskItem';
import Task from '../common/Task';

type Props = {
  tasks: Task[];
  setEditTask: (task: Task) => void;
  setEnableEdit: (enableEdit: boolean) => void;
  setIsOpenModal: (isOpenModal: boolean) => void;
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
}

const TodoList = (props: Props) => {
  return (
    <>
      <div>TodoList</div>
      {
        props.tasks.map((task) => (
          <TaskItem key={task.getDueDate()} task={task} tasks={props.tasks} setEditTask={props.setEditTask}
            setEnableEdit={props.setEnableEdit} setIsOpenModal={props.setIsOpenModal}
            setTasks={props.setTasks} updateTask={props.updateTask} />
        ))
      }
    </>
  )
}

export default TodoList