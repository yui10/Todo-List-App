import dayjs from "dayjs";
import Fetch from "./Fetch";
import Task from "../common/Task";
export default class TaskApi {
    static async getTasks() {
        const response = await Fetch.get('/api/task');
        let tasks: Task[] = [];
        for (let task of response)
            tasks.push(new Task(task.id, dayjs(task.created_at), task.content, task.due_date, task.completed));
        return tasks;
    }

    static async createTask(task: Task) {
        const response = await Fetch.post('/api/task', task);
        return response;
    }

    static async updateTask(task: Task) {
        const response = await Fetch.put(`/api/task/${task.getId()}`, task);
        return response;
    }

    static async deleteTask(task: Task) {
        const response = await Fetch.delete(`/api/task/${task.getId()}`);
        return response;
    }
}
