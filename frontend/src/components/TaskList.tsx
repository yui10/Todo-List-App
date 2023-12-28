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
      <table>
        <thead>
          <tr>
            <th>Todo</th>
            <th>内容</th>
            <th>期限</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {
            props.tasks.map((task) => (
              <TaskItem key={task.getId()} task={task} tasks={props.tasks} setEditTask={props.setEditTask}
                setEnableEdit={props.setEnableEdit} setIsOpenModal={props.setIsOpenModal}
                setTasks={props.setTasks} updateTask={props.updateTask} />
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default TodoList