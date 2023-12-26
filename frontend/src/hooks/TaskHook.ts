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
            setTaskList([...taskList, task]);
        });
    };

    return { taskList, setTaskList, CreateTask };
}
export default useTaskHook;
