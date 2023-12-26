import React, { useEffect } from "react";
import TaskApi from "../apis/Task-API";
import Task from "../common/Task";

function useTaskHook() {
    const [taskList, setTaskList] = React.useState<Task[]>([]);

    useEffect(() => {
        TaskApi.getTasks().then((response) => {
            setTaskList(response);
        });
    }, []);

    const CreateTask = (task: Task) => {
        TaskApi.createTask(task).then((response) => {
            let task = new Task(response.id, response.content, response.due_date, response.completed);
            setTaskList([...taskList, task]);
        });
    };

    const UpdateTask = (task: Task) => {
        TaskApi.updateTask(task).then((response) => {
            if (response.id === undefined) return;
            setTaskList(taskList.map((_task) => _task.getId() === task.getId() ? task : _task));

        });
    }

    const DeleteTask = (task: Task) => {
        TaskApi.deleteTask(task).then((response) => {
            if (response.id === undefined) return;
            setTaskList(taskList.filter((_task) => _task.getId() !== task.getId()));
        });
    };


    return { taskList, setTaskList, CreateTask, UpdateTask, DeleteTask };
}
export default useTaskHook;
