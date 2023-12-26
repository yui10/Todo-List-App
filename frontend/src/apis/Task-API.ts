import Fetch from "./Fetch";
import Task from "../common/Task";
export default class TaskApi {
    static async getTasks() {
        const response = await Fetch.get('/api/task');
        return response.data;
    }

    static async createTask(task: Task) {
        const response = await Fetch.post('/api/task', task);
        return response.data;
    }

    static async updateTask(task: Task) {
        const response = await Fetch.put(`/api/task/${task.getId()}`, task);
        return response.data;
    }

    static async deleteTask(task: Task) {
        const response = await Fetch.delete(`/api/task/${task.getId()}`);
        return response.data;
    }
}
