import request from "supertest";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

import app from "../app";
import Task from "../common/Task";
import TaskTable from "../database/TaskTable";

const taskTable = new TaskTable();

describe('Express API', () => {
    const ids: string[] = [uuid(), uuid(), uuid()];
    ids.sort();
    const tasks: Task[] = [];
    for (let id of ids) {
        let task = new Task(id, dayjs(), "content", dayjs().add(1, "day"), false);
        tasks.push(task);
    }

    beforeEach(async () => {
        await taskTable.deleteAll();
    });

    afterEach(async () => {
        await taskTable.deleteAll();
    });

    afterAll(async () => {
        await taskTable.deleteAll();
        taskTable.close();
    });


    test("GET /api/task", async () => {
        for (let task of tasks)
            await taskTable.append(task);

        const response = await request(app).get("/api/task").set('Accept', 'application/json');

        expect(response.status).toBe(200);

        let res_object = JSON.parse(response.text);
        let res_task: Task[] = [];
        for (let i = 0; i < res_object.length; i++) {
            res_task.push(new Task(res_object[i].id, dayjs(res_object[i].created_at), res_object[i].content, dayjs(res_object[i].due_date), res_object[i].completed));
        }

        expect(res_task).toEqual(tasks);
    });

    test("POST /api/task", async () => {
        let task = tasks[0];
        const response = await request(app).post("/api/task").send(task).set("Accept", "application/json");
        let id = JSON.parse(response.text).id, created_at = JSON.parse(response.text).created_at;
        task = new Task(id, dayjs(created_at), task.getContent(), task.getDueDate(), task.isCompleted());

        expect(response.status).toBe(201);

        let res_object = JSON.parse(response.text);
        let res_task = new Task(res_object.id, dayjs(res_object.created_at), res_object.content, dayjs(res_object.due_date), res_object.completed);
        expect(res_task).toEqual(task);
    });

    test("PUT /api/task/:id", async () => {
        let task = tasks[0];
        await taskTable.append(task);

        task = new Task(task.getId(), task.getCreatedAt(), "updated content", task.getDueDate(), task.isCompleted());
        const response = await request(app).put(`/api/task/${task.getId()}`).send(task).set("Accept", "application/json");

        expect(response.status).toBe(200);

        let res_object = JSON.parse(response.text);
        let res_task = new Task(res_object.id, dayjs(res_object.created_at), res_object.content, dayjs(res_object.due_date), res_object.completed);
        expect(res_task).toEqual(task);
    });

    test("DELETE /api/task/:id", async () => {
        let task = tasks[0];
        await taskTable.append(task);

        const response = await request(app).delete(`/api/task/${task.getId()}`).set("Accept", "application/json");
        expect(response.status).toBe(200);
        let res_object = JSON.parse(response.text);
        expect(res_object.id).toEqual(task.getId());
        let tasks_res = await taskTable.findAll();
        expect(tasks_res.length).toBe(0);
    });

    test("DELETE /api/task/:id (not found)", async () => {
        const response = await request(app).delete(`/api/task/${uuid()}`).set("Accept", "application/json");
        expect(response.status).toBe(404);
        let tasks_res = await taskTable.findAll();
        expect(tasks_res.length).toBe(0);
    });
});