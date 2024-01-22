import React, { useEffect } from "react";
import dayjs from "dayjs";
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        TaskApi.createTask(task).then((response: any) => {
            const responseTask = new Task(response.id, dayjs(response.created_at), response.content, response.due_date, response.completed);
            setTaskList([...taskList, responseTask]);
        });
    };

    const UpdateTask = (task: Task) => {
        TaskApi.updateTask(task).then((response) => {
            if (response.id === undefined) return;
            setTaskList(taskList.map((_task) => _task.getId() === task.getId() ? task : _task));

        });
    }

    const DeleteTasks = async (task: Task[]) => {
        const deleteAPI = task.map((_task) => TaskApi.deleteTask(_task));

        const successIDs: string[] = [];
        await Promise.all(deleteAPI).then((response) => {
            for (let i = 0; i < response.length; i += 1) {
                if (response[i].id !== undefined)
                    successIDs.push(response[i].id);
            }
        });
        setTaskList(taskList.filter((_task) => !successIDs.includes(_task.getId())));
    };


    return { taskList, setTaskList, CreateTask, UpdateTask, DeleteTasks };
}
export default useTaskHook;
