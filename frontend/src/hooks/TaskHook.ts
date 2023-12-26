import React from "react";
import TaskApi from "../apis/Task-API";
import Task from "../common/Task";

function useTaskHook() {
    const [taskList, setTaskList] = React.useState<Task[]>([]);
    const CreateTask = (task: Task) => {
        TaskApi.createTask(task).then((response) => {
            console.log(response);
            setTaskList([...taskList, task]);
        });
    };

    return { taskList, setTaskList, CreateTask };
}
export default useTaskHook;
