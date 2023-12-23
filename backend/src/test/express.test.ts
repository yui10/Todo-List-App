import request from "supertest";
import { v4 as uuid } from "uuid";

import app from "../app";
import Task from "../common/Task";
import TaskTable from "../database/TaskTable";

const taskTable = new TaskTable();

describe('Express API', () => {
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
        const ids: string[] = [uuid(), uuid(), uuid()];
        ids.sort();
        let tasks = [];
        for (let id of ids) {
            let task = new Task(id, "content", new Date().toString(), false);
            tasks.push(task);
        }
        for (let task of tasks)
            await taskTable.append(task);



        const response = await request(app).get("/api/task").set('Accept', 'application/json');

        expect(response.status).toBe(200);

        let res_object = JSON.parse(response.text);
        let res_task: Task[] = [];
        for (let i = 0; i < res_object.length; i++) {
            res_task.push(new Task(res_object[i].id, res_object[i].content, res_object[i].due_date, res_object[i].completed));
        }

        expect(res_task).toEqual(tasks);
    });

    test("POST /api/task", async () => {
        let task = new Task(uuid(), "content", new Date().toString(), false);
        const response = await request(app).post("/api/task").send(task).set("Accept", "application/json");
        let id = JSON.parse(response.text).id;
        task = new Task(id, task.getContent(), task.getDueDate(), task.isCompleted());

        expect(response.status).toBe(201);

        let res_object = JSON.parse(response.text);
        let res_task = new Task(res_object.id, res_object.content, res_object.due_date, res_object.completed);
        expect(res_task).toEqual(task);
    });

    test("PUT /api/task/:id", async () => {
        let task = new Task(uuid(), "content", new Date().toString(), false);
        await taskTable.append(task);

        task = new Task(task.getId(), "updated content", task.getDueDate(), task.isCompleted());
        const response = await request(app).put(`/api/task/${task.getId()}`).send(task).set("Accept", "application/json");

        expect(response.status).toBe(200);

        let res_object = JSON.parse(response.text);
        let res_task = new Task(res_object.id, res_object.content, res_object.due_date, res_object.completed);
        expect(res_task).toEqual(task);
    });

    test("DELETE /api/task/:id", async () => {
        let task = new Task(uuid(), "content", new Date().toString(), false);
        await taskTable.append(task);

        const response = await request(app).delete(`/api/task/${task.getId()}`).set("Accept", "application/json");
        expect(response.status).toBe(200);
        let res_object = JSON.parse(response.text);
        expect(res_object.id).toEqual(task.getId());
        let tasks = await taskTable.findAll();
        expect(tasks.length).toBe(0);
    });

    test("DELETE /api/task/:id (not found)", async () => {
        const response = await request(app).delete(`/api/task/${uuid()}`).set("Accept", "application/json");
        expect(response.status).toBe(404);
        let tasks = await taskTable.findAll();
        expect(tasks.length).toBe(0);
    });
});